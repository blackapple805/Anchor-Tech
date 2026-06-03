const iconProps = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

export function Anchor({ className = '', ...props }) {
  return (
    <svg
      className={className}
      viewBox="0 0 44 44"
      fill="none"
      {...props}
      
    >
      <g
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="22" cy="12.5" r="4" />
        <line x1="22" y1="16.5" x2="22" y2="37" />
        <path d="M12 23 H8 a14 14 0 0 0 28 0 h-4" />
      </g>
    </svg>
  );
}

export function Phone({ className = '', ...props }) {
  return (
    <svg className={className} {...iconProps} {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function Menu({ className = '', ...props }) {
  return (
    <svg className={className} {...iconProps} {...props}>
      <line x1="3" y1="7" x2="21" y2="7" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="17" x2="21" y2="17" />
    </svg>
  );
}

export function X({ className = '', ...props }) {
  return (
    <svg className={className} {...iconProps} {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function Chevron({ className = '', ...props }) {
  return (
    <svg className={className} {...iconProps} {...props}>
      <polyline points="9 6 15 12 9 18" />
    </svg>
  );
}

export function Arrow({ className = '', ...props }) {
  return (
    <svg className={className} {...iconProps} {...props}>
      <path d="M5 12h14" />
      <polyline points="13 5 20 12 13 19" />
    </svg>
  );
}

export function Check({ className = '', ...props }) {
  return (
    <svg className={className} {...iconProps} {...props}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function Star({ className = '', ...props }) {
  return (
    <svg className={className} {...iconProps} {...props}>
      <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9" />
    </svg>
  );
}

export function Pin({ className = '', ...props }) {
  return (
    <svg className={className} {...iconProps} {...props}>
      <path d="M12 2a5 5 0 0 0-5 5c0 3.75 5 11 5 11s5-7.25 5-11a5 5 0 0 0-5-5z" />
      <circle cx="12" cy="7" r="2" />
    </svg>
  );
}
