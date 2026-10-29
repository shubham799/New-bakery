// The hero cookie: the logo's bitten cookie. Bites are SVG mask circles
// (.bite-1 top-right, .bite-2 left) so GSAP can scale them in; crumbs are
// unmasked children so they can fly off.
import { useId } from 'react';
import { assetUrl } from '../lib/assets';

// Deterministic pseudo-random so illustrations render the same every time.
export function rng(seed = 1) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

// Chunks / inclusions scattered over a round cookie face.
export function Chunks({ cx, cy, r, count = 9, color, color2, seed = 3, size = 1 }) {
  const rand = rng(seed);
  const out = [];
  for (let i = 0; i < count; i++) {
    const a = rand() * Math.PI * 2;
    const d = Math.sqrt(rand()) * r * 0.78;
    const x = cx + Math.cos(a) * d;
    const y = cy + Math.sin(a) * d;
    const s = (r / 9) * (0.6 + rand() * 0.6) * size;
    const rot = rand() * 90;
    const fill = color2 && i % 3 === 2 ? color2 : color;
    out.push(
      <path
        key={i}
        d={`M${-s} ${-s * 0.6} L${s * 0.4} ${-s} L${s} ${-s * 0.1} L${s * 0.6} ${s * 0.8} L${-s * 0.7} ${s * 0.7} Z`}
        transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(0)})`}
        fill={fill}
        strokeLinejoin="round"
        stroke={fill}
        strokeWidth={s * 0.5}
      />,
    );
  }
  return <g>{out}</g>;
}

// Flat top-down cookie face (used by many illustrations).
export function CookieFace({ cx, cy, r, dough = '#D4943F', chunk = '#4B2E1F', chunk2, seed = 3, count = 8 }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={dough} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#000" strokeOpacity=".12" strokeWidth={r * 0.12} />
      <circle cx={cx - r * 0.18} cy={cy - r * 0.2} r={r * 0.55} fill="#fff" opacity=".1" />
      <path
        d={`M${cx - r * 0.5} ${cy + r * 0.1} q${r * 0.2} ${-r * 0.15} ${r * 0.4} 0 M${cx + r * 0.1} ${cy - r * 0.45} q${r * 0.15} ${r * 0.1} ${r * 0.3} 0`}
        stroke="#000"
        strokeOpacity=".14"
        strokeWidth={r * 0.04}
        fill="none"
        strokeLinecap="round"
      />
      <Chunks cx={cx} cy={cy} r={r} count={count} color={chunk} color2={chunk2} seed={seed} />
    </g>
  );
}

export default function CookieArt({ bites = 1, className = '', photo = 'hero-cookie', rotation = 0 }) {
  const id = useId().replace(/:/g, '');
  const url = photo ? assetUrl(photo) : null;
  return (
    <svg className={`cookie-art ${className}`} viewBox="0 0 200 200" aria-hidden="true" overflow="visible">
      <defs>
        <mask id={`m${id}`} maskUnits="userSpaceOnUse" x="-20" y="-20" width="240" height="240">
          <rect x="-20" y="-20" width="240" height="240" fill="#fff" />
          {/* Bite 1: top-right edge */}
          <g className="bite bite-1">
            <circle cx="172" cy="34" r="30" fill="#000" />
            <circle cx="148" cy="20" r="14" fill="#000" />
            <circle cx="187" cy="60" r="13" fill="#000" />
          </g>
          {/* Bite 2: left edge (the final echo in the footer) */}
          {bites > 1 && (
            <g className="bite bite-2">
              <circle cx="14" cy="112" r="30" fill="#000" />
              <circle cx="22" cy="80" r="13" fill="#000" />
              <circle cx="20" cy="142" r="14" fill="#000" />
            </g>
          )}
        </mask>
        <radialGradient id={`g${id}`} cx="45%" cy="40%" r="60%">
          <stop offset="0" stopColor="#E7AE5C" />
          <stop offset=".75" stopColor="#D4943F" />
          <stop offset="1" stopColor="#B57A2E" />
        </radialGradient>
      </defs>
      <g mask={`url(#m${id})`}>
        <g transform={rotation ? `rotate(${rotation} 100 100)` : undefined}>
          {url ? (
            <image href={url} x="4" y="4" width="192" height="192" preserveAspectRatio="xMidYMid slice" />
          ) : (
            <>
              <circle cx="100" cy="100" r="92" fill={`url(#g${id})`} />
              <circle cx="100" cy="100" r="88" fill="none" stroke="#9A6424" strokeOpacity=".35" strokeWidth="6" />
              <path
                d="M52 92q14-10 28 0M110 54q12 8 26 2M120 128q10 10 24 4M64 140q8-8 20-4"
                stroke="#9A6424"
                strokeOpacity=".4"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <Chunks cx={100} cy={100} r={92} count={12} color="#4B2E1F" color2="#3A2216" seed={7} size={0.9} />
            </>
          )}
        </g>
      </g>
      {/* Crumbs that fly off when the bite is taken */}
      <g className="crumbs">
        <circle className="crumb" cx="176" cy="40" r="5" fill="#C98A3A" opacity="0" />
        <circle className="crumb" cx="164" cy="30" r="3.5" fill="#B57A2E" opacity="0" />
        <circle className="crumb" cx="182" cy="52" r="3" fill="#D4943F" opacity="0" />
      </g>
    </svg>
  );
}
