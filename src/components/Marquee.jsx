/* Marquee — a seamless, infinitely revolving ribbon of editorial phrases.
   The track holds the items twice; the keyframe shifts it left by exactly one
   group width, so the loop is perfectly continuous with no visible jump.
   Pauses on hover and respects prefers-reduced-motion (handled in CSS). */
function renderItems(items) {
  return items.map((item, i) =>
    typeof item === 'string' ? (
      <span className="marquee-item" key={i}>{item}</span>
    ) : (
      <span className={`marquee-item ${item.muted ? 'is-muted' : ''}`} key={i}>{item.text}</span>
    )
  );
}

export default function Marquee({ items = [], speed = 38, ariaLabel = 'Highlights' }) {
  return (
    <section
      className="marquee"
      aria-label={ariaLabel}
      style={{ '--marquee-speed': `${speed}s` }}
    >
      <div className="marquee-track">
        <div className="marquee-group" aria-hidden="true">{renderItems(items)}</div>
        <div className="marquee-group" aria-hidden="true">{renderItems(items)}</div>
      </div>
    </section>
  );
}
