/* Shared section heading components: Eyebrow (small label with optional index
   mark) and SectionHead (eyebrow + title + optional lead), used identically
   across every page. */

export function Eyebrow({ ix, children, className = '' }) {
  return (
    <p className={`eyebrow ${className}`.trim()}>
      {ix != null && <span className="ix">{ix}</span>}
      {children}
    </p>
  );
}

export function SectionHead({ ix, eyebrow, title, lead, center, display, className = '' }) {
  return (
    <div className={`section-head ${center ? 'center' : ''} ${className}`.trim()}>
      <Eyebrow ix={ix}>{eyebrow}</Eyebrow>
      <h2 className={display ? 'title title--display' : 'title'}>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}
