// Line icons matching the menu cards' badge set. All use currentColor.
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

export function LeafIcon(props) {
  return (
    <svg viewBox="0 0 32 32" {...base} {...props}>
      <path d="M8 25c-1-9 4-16 17-18-1 12-7 18-16 18" fill="currentColor" stroke="none" />
      <path d="M7 26c4-6 8-10 13-13" stroke="var(--cream, #F8F4EC)" />
    </svg>
  );
}

export function ButterIcon(props) {
  return (
    <svg viewBox="0 0 32 32" {...base} {...props}>
      <path d="M5 15l11-5 11 4v7l-11 5-11-4z" fill="currentColor" stroke="none" />
      <path d="M5 15l11 4 11-5M16 19v7" stroke="var(--cream, #F8F4EC)" strokeWidth="1.4" />
    </svg>
  );
}

export function BowlIcon(props) {
  return (
    <svg viewBox="0 0 32 32" {...base} {...props}>
      <path d="M5 15h22c0 6-5 10-11 10S5 21 5 15z" />
      <path d="M12 25h8" />
      <path d="M17 15l8-11" />
      <path d="M23 3.5c1.5-.8 3 .7 2.2 2.2l-1.5 1.3-2-1.5z" fill="currentColor" />
    </svg>
  );
}

export function SproutIcon(props) {
  return (
    <svg viewBox="0 0 32 32" {...base} {...props}>
      <path d="M16 28V15" />
      <path d="M16 16c-1-6-6-8-11-7 0 5 4 9 11 7z" fill="currentColor" stroke="none" />
      <path d="M16 16c1-6 6-8 11-7 0 5-4 9-11 7z" fill="currentColor" stroke="none" />
      <path d="M16 13c-2-4 0-8 0-9 0 1 2 5 0 9z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export const badgeIcons = { leaf: LeafIcon, butter: ButterIcon, bowl: BowlIcon, sprout: SproutIcon };

export function HeartIcon({ filled = true, ...props }) {
  return (
    <svg viewBox="0 0 24 24" {...base} fill={filled ? 'currentColor' : 'none'} {...props}>
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
    </svg>
  );
}

export function PinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

export function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      <path
        fill="currentColor"
        d="M12 2.2A9.7 9.7 0 0 0 3.6 16.8L2.3 21.7l5-1.3A9.7 9.7 0 1 0 12 2.2zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.2.1-.1 0-.3 0-.4l-.7-1.8c-.2-.5-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1.1 2.7.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.5-.3z"
      />
    </svg>
  );
}

export function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r=".9" fill="currentColor" />
    </svg>
  );
}

export function PhoneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M6.6 3.5l2.6.4 1.2 3.6-1.8 1.4a11 11 0 0 0 6.5 6.5l1.4-1.8 3.6 1.2.4 2.6c0 1.2-1 2.1-2.2 2.1A16 16 0 0 1 4.5 5.7c0-1.2.9-2.2 2.1-2.2z" />
    </svg>
  );
}

export function ClockIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function CalendarIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="4" y="5.5" width="16" height="14" rx="2" />
      <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
    </svg>
  );
}

export function ScooterIcon(props) {
  return (
    <svg viewBox="0 0 48 32" {...base} {...props}>
      <circle cx="10" cy="25" r="4.5" />
      <circle cx="38" cy="25" r="4.5" />
      <path d="M14.5 25h15l4-12h5M33 13l-2-5h-4" />
      <rect x="5" y="11" width="11" height="9" rx="1.5" />
      <path d="M19 25l-2-8h10" />
    </svg>
  );
}

export function BagIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M5 8h14l-1 12H6z" />
      <path d="M9 10V7a3 3 0 0 1 6 0v3" />
    </svg>
  );
}

export function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ChevronIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
