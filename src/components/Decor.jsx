// Brand decoration shared by every section: logo, veg mark, notched double
// frame, leaf sprigs, heart dividers, cookie-bite scalloped dividers, badges.
import { useId } from 'react';
import logoUrl from '../assets/logo.png';
import { badgeIcons, HeartIcon } from './Icons';
import { badges } from '../data/content';

export function Logo({ size = 64, className = '' }) {
  return (
    <img
      src={logoUrl}
      width={size}
      height={size}
      className={`logo ${className}`}
      alt="The Good Bite — Homemade Happiness!"
    />
  );
}

export function VegMark({ className = '' }) {
  return (
    <span className={`veg-mark ${className}`} role="img" aria-label="Vegetarian">
      <span />
    </span>
  );
}

// Gingham border + thin double khaki frame with notched corners.
export function Frame() {
  return (
    <div className="frame" aria-hidden="true">
      <i className="notch tl" />
      <i className="notch tr" />
      <i className="notch bl" />
      <i className="notch br" />
    </div>
  );
}

export function LeafSprig({ flip = false, className = '' }) {
  return (
    <svg
      className={`leaf-sprig ${flip ? 'is-flipped' : ''} ${className}`}
      viewBox="0 0 64 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M60 44C44 38 28 28 14 10" />
      <path d="M44 36c-2-8 0-14 6-18 2 8 0 14-6 18z" />
      <path d="M33 28c-4-6-4-13 0-18 4 6 4 12 0 18z" />
      <path d="M22 19c-6-3-9-9-8-15 6 2 9 8 8 15z" />
      <path d="M48 40c6-4 12-4 16-1-5 4-11 4-16 1z" />
    </svg>
  );
}

export function HeartRule({ dotted = false }) {
  return (
    <div className={`heart-rule ${dotted ? 'is-dotted' : ''}`} aria-hidden="true">
      <span />
      <HeartIcon width="14" height="14" />
      <span />
    </div>
  );
}

// Cookie-bite scalloped edge. Fills the area below the scallops with `color`.
// It sits at the top of a section and overlaps the previous one by ~40px.
export function BiteDivider({ color = 'var(--cream)', className = '' }) {
  const maskId = `bite-${useId().replace(/:/g, '')}`;
  const w = 1440;
  const h = 44;
  const r = 24;
  // Scallops (cookie edge) with two bigger bites taken out of it.
  const bites = [
    { at: 0.27, r: 56 },
    { at: 0.74, r: 44 },
  ];
  let d = `M0 ${h} L0 ${r}`;
  for (let x = 0; x < w; x += r * 2) {
    d += ` A${r} ${r * 0.62} 0 0 1 ${x + r * 2} ${r}`;
  }
  d += ` L${w} ${h} Z`;
  return (
    <svg
      className={`bite-divider ${className}`}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <mask id={maskId}>
          <rect width={w} height={h} fill="#fff" />
          {bites.map((b) => (
            <g key={b.at}>
              <circle cx={w * b.at} cy={-b.r * 0.35} r={b.r} fill="#000" />
              <circle cx={w * b.at - b.r * 0.9} cy={-b.r * 0.45} r={b.r * 0.5} fill="#000" />
              <circle cx={w * b.at + b.r * 0.9} cy={-b.r * 0.4} r={b.r * 0.45} fill="#000" />
            </g>
          ))}
        </mask>
      </defs>
      <path d={d} fill={color} mask={`url(#${maskId})`} />
    </svg>
  );
}

export function BadgeSticker({ badge, className = '', ...rest }) {
  const Icon = badgeIcons[badge.icon];
  return (
    <div className={`badge-sticker ${className}`} {...rest}>
      <Icon className="badge-icon" />
      <span className="badge-text">
        {badge.lines.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </span>
    </div>
  );
}

// The four menu badges in a row (used in footers of sections).
export function BadgeRow({ className = '' }) {
  return (
    <ul className={`badge-row ${className}`} aria-label="Our promise">
      {badges.map((b) => {
        const Icon = badgeIcons[b.icon];
        return (
          <li key={b.id}>
            <span className="badge-row-icon">
              <Icon />
            </span>
            <span className="badge-row-text">{b.lines.join(' ')}</span>
          </li>
        );
      })}
    </ul>
  );
}
