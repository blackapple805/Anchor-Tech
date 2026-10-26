#!/usr/bin/env node
// Checks a Breeze release against everything the Anchor Tech RMM skin relies
// on, so you find out what a Breeze update changes BEFORE you install it.
//
//   node rmm-skin/scripts/check-breeze.mjs              # latest Breeze release
//   node rmm-skin/scripts/check-breeze.mjs 0.124.0      # a specific release
//   node rmm-skin/scripts/check-breeze.mjs 0.124.0 --src C:\path\to\breeze
//   ... --report report.md                             # also write Markdown
//
// Needs Node 18+ and git. Without --src it downloads only Breeze's web app
// source for that release (a sparse, shallow clone) into a temp folder and
// deletes it afterwards.
//
// What it checks:
//   1. Theme colours: every colour token Breeze defines is either set by
//      skin.css or listed in breeze-compat.json as deliberately left stock.
//   2. Raw palette: every Tailwind colour family Breeze's UI uses is either
//      retuned by skin.css or listed as left stock, and Breeze is still on
//      Tailwind 4 (the retuning relies on its CSS variables).
//   3. Hooks: every data-testid / component the stylesheet targets, plus the
//      markup listed under "hooks" in breeze-compat.json, still exists.
//   4. Sign-in pages: every page on Breeze's sign-in layouts is matched by
//      the Worker's AUTH_PAGE list.
// Exits 1 if anything needs attention, 0 if the skin covers the release.

import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const SKIN_DIR = join(dirname(fileURLToPath(import.meta.url)), '..');
const BREEZE_REPO = 'https://github.com/lanternops/breeze.git';
const WEB = 'apps/web';
const SRC_EXT = /\.(tsx?|jsx?|mjs|astro|css)$/;
const TEST_FILE = /(\.test\.|\.spec\.|[\\/]__tests__[\\/]|[\\/]test[\\/])/;
const UTILITY_COLOUR = /\b(?:bg|text|border|ring|ring-offset|from|to|via|fill|stroke|outline|decoration|accent|divide|placeholder|caret|shadow)-([a-z]+)-(?:50|[1-9]00|950)\b/g;
const TAILWIND_FAMILIES = new Set(['slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']);

// ---------- arguments ----------
const args = process.argv.slice(2);
let version = 'latest';
let srcDir = null;
let reportPath = null;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--src') srcDir = args[++i];
  else if (args[i] === '--report') reportPath = args[++i];
  else if (args[i] === '-h' || args[i] === '--help') {
    console.log(readFileSync(fileURLToPath(import.meta.url), 'utf8').split('\n').slice(1, 12).join('\n').replace(/^\/\/ ?/gm, ''));
    process.exit(0);
  } else version = args[i];
}

// ---------- results ----------
const problems = [];
const notes = [];
const problem = (area, msg) => problems.push({ area, msg });
const note = (area, msg) => notes.push({ area, msg });

// ---------- helpers ----------
function git(argv, cwd) {
  const r = spawnSync('git', argv, { cwd, encoding: 'utf8' });
  if (r.error) throw new Error(`git is not installed or not on PATH (${r.error.message})`);
  if (r.status !== 0) throw new Error(`git ${argv.join(' ')} failed:\n${r.stderr.trim()}`);
  return r.stdout;
}

// "latest" = Breeze's latest published GitHub release. If the GitHub API
// can't be reached, fall back to the highest plain vX.Y.Z tag.
async function resolveTag(v) {
  if (v !== 'latest') return v.startsWith('v') ? v : `v${v}`;
  try {
    const headers = { 'User-Agent': 'anchor-rmm-skin-check', Accept: 'application/vnd.github+json' };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const res = await fetch('https://api.github.com/repos/lanternops/breeze/releases/latest', { headers });
    if (res.ok) return (await res.json()).tag_name;
  } catch {
    // fall through to the tag list
  }
  const tags = git(['ls-remote', '--tags', '--refs', BREEZE_REPO])
    .split('\n')
    .map((l) => l.split('refs/tags/')[1])
    .filter((t) => /^v\d+\.\d+\.\d+$/.test(t || ''))
    .sort((a, b) => {
      const pa = a.slice(1).split('.').map(Number);
      const pb = b.slice(1).split('.').map(Number);
      return pa[0] - pb[0] || pa[1] - pb[1] || pa[2] - pb[2];
    });
  if (!tags.length) throw new Error("Couldn't find Breeze's latest release. Pass a version, e.g. 0.124.0.");
  return tags.at(-1);
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name.startsWith('.')) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (SRC_EXT.test(name)) out.push(p);
  }
  return out;
}

// Colour custom properties declared inside `:root { }` or `.dark { }`. Only
// values that are colours count (Breeze stores most as bare HSL triplets like
// `225 62% 48%`), so layout variables such as toast offsets are ignored.
const COLOUR_VALUE = /^(?:-?\d+(?:\.\d+)?(?:deg)?\s+\d+(?:\.\d+)?%\s+\d+(?:\.\d+)?%|#[0-9a-f]{3,8}\b|(?:hsla?|rgba?|oklch|oklab|lch|lab|color-mix)\()/i;
function themeTokens(css) {
  const tokens = new Set();
  const re = /(^|[\s;}])(:root|\.dark)\s*\{/g;
  let m;
  while ((m = re.exec(css))) {
    let depth = 1;
    let i = re.lastIndex;
    const start = i;
    while (i < css.length && depth > 0) {
      if (css[i] === '{') depth++;
      else if (css[i] === '}') depth--;
      i++;
    }
    const body = css.slice(start, i - 1).replace(/\/\*[\s\S]*?\*\//g, '');
    for (const t of body.matchAll(/(?:^|[;{\s])(--[a-z0-9-]+)\s*:\s*([^;}]*)/g)) {
      if (COLOUR_VALUE.test(t[2].trim())) tokens.add(t[1]);
    }
  }
  return tokens;
}

function routeOf(pagesDir, file) {
  const parts = relative(pagesDir, file).replace(/\.astro$/, '').split(sep);
  const segs = parts.map((p) => p.replace(/^\[\.\.\.?(.+)\]$/, 'sample-$1').replace(/^\[(.+)\]$/, 'sample-$1'));
  if (segs.at(-1) === 'index') segs.pop();
  return '/' + segs.join('/');
}

// ---------- main ----------
const compat = JSON.parse(readFileSync(join(SKIN_DIR, 'breeze-compat.json'), 'utf8'));
const skinCss = readFileSync(join(SKIN_DIR, 'public/anchor-skin/skin.css'), 'utf8');
const workerJs = readFileSync(join(SKIN_DIR, 'src/worker.js'), 'utf8');

let tag;
let cleanup = null;
try {
  tag = await resolveTag(version);
  if (!srcDir) {
    srcDir = mkdtempSync(join(tmpdir(), 'breeze-'));
    cleanup = srcDir;
    console.log(`Downloading Breeze ${tag} web source...`);
    git(['clone', '--quiet', '--depth', '1', '--filter=blob:none', '--sparse', '--branch', tag, BREEZE_REPO, srcDir]);
    git(['sparse-checkout', 'set', `${WEB}/src`], srcDir);
  }

  const webSrc = join(srcDir, WEB, 'src');
  if (!existsSync(webSrc)) throw new Error(`${webSrc} not found. Is --src a Breeze checkout?`);
  const files = walk(webSrc).filter((f) => !TEST_FILE.test(f));
  const text = new Map(files.map((f) => [f, readFileSync(f, 'utf8')]));
  const everything = [...text.values()].join('\n');
  const read = (rel) => {
    const p = join(srcDir, ...rel.split('/'));
    return existsSync(p) ? readFileSync(p, 'utf8') : null;
  };

  // 1. Theme colour tokens
  const globals = read(`${WEB}/src/styles/globals.css`);
  const skinTokens = new Set([...skinCss.matchAll(/(--[a-z0-9-]+)\s*:/g)].map((m) => m[1]));
  if (!globals) {
    problem('Theme colours', `Breeze moved or removed ${WEB}/src/styles/globals.css, where its colour tokens lived. The skin's colours may no longer apply.`);
  } else {
    const breezeTokens = themeTokens(globals);
    const leftStock = new Set(compat.tokensLeftStock);
    for (const t of [...breezeTokens].sort()) {
      if (!skinTokens.has(t) && !leftStock.has(t)) {
        problem('Theme colours', `Breeze defines \`${t}\`, which the skin doesn't set. Add it to skin.css (both :root and .dark), or to tokensLeftStock in breeze-compat.json if stock is fine.`);
      }
    }
    for (const t of [...skinTokens].filter((t) => !t.startsWith('--color-') && t !== '--font-sans').sort()) {
      if (!breezeTokens.has(t)) note('Theme colours', `skin.css sets \`${t}\`, which Breeze doesn't define. Harmless; remove it if it's no longer needed.`);
    }
    for (const t of compat.tokensLeftStock) {
      if (!breezeTokens.has(t)) note('Theme colours', `\`${t}\` is listed as left stock but Breeze no longer defines it.`);
    }
  }

  // 2. Raw Tailwind palette
  const remapped = new Set([...skinCss.matchAll(/--color-([a-z]+)-\d+\s*:/g)].map((m) => m[1]));
  const leftStockFamilies = new Set(compat.paletteLeftStock);
  const familyCount = new Map();
  for (const m of everything.matchAll(UTILITY_COLOUR)) {
    if (TAILWIND_FAMILIES.has(m[1])) familyCount.set(m[1], (familyCount.get(m[1]) || 0) + 1);
  }
  for (const [fam, n] of [...familyCount].sort((a, b) => b[1] - a[1])) {
    if (!remapped.has(fam) && !leftStockFamilies.has(fam)) {
      problem('Raw palette', `Breeze's UI now uses Tailwind \`${fam}\` (${n} places), which the skin neither retunes nor lists as left stock. Decide which, then update skin.css or paletteLeftStock.`);
    }
  }
  const remappedSummary = [...remapped].map((f) => `${f} ${familyCount.get(f) || 0}`).join(', ');
  note('Raw palette', `Retuned by the skin: ${remappedSummary || 'none'}.`);
  const pkg = read(`${WEB}/package.json`);
  const twMajor = pkg && (JSON.parse(pkg).devDependencies?.tailwindcss || JSON.parse(pkg).dependencies?.tailwindcss || '').match(/\d+/)?.[0];
  if (remapped.size && twMajor !== '4') {
    problem('Raw palette', `Breeze's web app is on Tailwind ${twMajor || 'unknown'}, not 4. The skin's blue/sky/indigo retuning relies on Tailwind 4's --color-* variables and may have stopped working.`);
  }

  // 3. Hooks
  const testIds = new Set([...skinCss.matchAll(/data-testid=['"]([^'"]+)['"]/g)].map((m) => m[1]));
  for (const id of testIds) {
    if (!everything.includes(`"${id}"`) && !everything.includes(`'${id}'`)) {
      problem('Hooks', `skin.css styles \`[data-testid='${id}']\`, which Breeze no longer has. That rule has stopped applying.`);
    }
  }
  const islands = new Set([...skinCss.matchAll(/component-url\*=['"]([^'"]+)['"]/g)].map((m) => m[1]));
  for (const name of islands) {
    if (!files.some((f) => f.endsWith(`${sep}${name}.tsx`) || f.endsWith(`${sep}${name}.jsx`))) {
      problem('Hooks', `skin.css targets the \`${name}\` component, which Breeze no longer has. The sign-in panel styling has stopped applying.`);
    }
  }
  for (const hook of compat.hooks) {
    const haystack = hook.file ? read(hook.file) : everything;
    const where = hook.file || `${WEB}/src`;
    if (haystack == null) {
      problem('Hooks', `${where} is gone. ${hook.why}.`);
      continue;
    }
    const texts = hook.text == null ? [] : [].concat(hook.text);
    const found = hook.pattern ? new RegExp(hook.pattern).test(haystack) : texts.some((t) => haystack.includes(t));
    if (!found) problem('Hooks', `Changed in ${where}: ${hook.why}.`);
  }

  // 4. Sign-in pages vs the Worker's AUTH_PAGE list
  const lit = workerJs.match(/const AUTH_PAGE = \/(.+)\/([a-z]*);/);
  if (!lit) {
    problem('Sign-in pages', "Couldn't find `const AUTH_PAGE = /.../;` in src/worker.js.");
  } else {
    const authPage = new RegExp(lit[1], lit[2]);
    const pagesDir = join(webSrc, 'pages');
    const authPages = files.filter((f) => f.startsWith(pagesDir) && f.endsWith('.astro') && /layouts\/(AuthLayout|AuthShellBranded)(\.astro)?['"]/.test(text.get(f)));
    const missed = authPages.map((f) => routeOf(pagesDir, f)).filter((r) => !authPage.test(r));
    for (const r of missed) {
      problem('Sign-in pages', `\`${r}\` uses Breeze's sign-in layout but isn't in AUTH_PAGE in src/worker.js, so it won't get the sign-in styling.`);
    }
    note('Sign-in pages', `${authPages.length} pages use Breeze's sign-in layouts; ${authPages.length - missed.length} are covered.`);
  }

  // ---------- report ----------
  const ok = problems.length === 0;
  const head = ok
    ? `Breeze ${tag}: the skin covers this release.`
    : `Breeze ${tag}: ${problems.length} thing${problems.length === 1 ? '' : 's'} to fix in the skin.`;
  console.log(`\n${ok ? 'PASS' : 'FAIL'}  ${head}\n`);
  for (const p of problems) console.log(`  ✗ [${p.area}] ${p.msg}`);
  if (problems.length) console.log('');
  for (const n of notes) console.log(`  · [${n.area}] ${n.msg}`);
  if (compat.testedWith && `v${compat.testedWith}` !== tag) {
    console.log(`\n  Skin last confirmed on ${compat.testedWith}. Once you've checked it on ${tag.replace(/^v/, '')}, set testedWith in breeze-compat.json.`);
  }

  if (reportPath) {
    const md = [
      `## ${head}`,
      '',
      ok ? 'Nothing the skin relies on changed.' : 'Fix these in `rmm-skin/`, then redeploy with `npx wrangler deploy`:',
      '',
      ...problems.map((p) => `- [ ] **${p.area}:** ${p.msg}`),
      '',
      '<details><summary>Details</summary>',
      '',
      ...notes.map((n) => `- ${n.area}: ${n.msg}`),
      `- Skin last confirmed on: ${compat.testedWith}`,
      '',
      '</details>',
      '',
    ].join('\n');
    writeFileSync(reportPath, md);
  }
  process.exitCode = ok ? 0 : 1;
} catch (err) {
  console.error(`\nCouldn't run the check: ${err.message}`);
  process.exitCode = 2;
} finally {
  if (cleanup) rmSync(cleanup, { recursive: true, force: true });
}
