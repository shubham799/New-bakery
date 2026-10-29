// Scene 3 visuals: a fan of 8 thin crunchy cookies, a stack of 4 thick soft
// baked cookies (top one splits for center-filled), a fan of sliced biscotti.
// Decorative only; colours come from the flavour's DERIVED tint.
import { useId } from 'react';
import { motion } from 'motion/react';
import { CookieFace, Chunks } from '../components/CookieArt';

const spring = { type: 'spring', stiffness: 260, damping: 14 };

export function CrunchyFan({ tint }) {
  const pivot = { x: 200, y: 300 };
  const angles = Array.from({ length: 8 }, (_, i) => -70 + (140 / 7) * i);
  return (
    <g>
      <ellipse cx="200" cy="360" rx="170" ry="16" fill="#4B2E1F" opacity=".1" />
      {angles.map((a, i) => {
        const rad = ((a - 90) * Math.PI) / 180;
        const cx = pivot.x + Math.cos(rad) * 128;
        const cy = pivot.y + Math.sin(rad) * 128 + 18;
        return (
          <g key={i}>
            <circle cx={cx + 3} cy={cy + 5} r="60" fill="#9A6424" opacity=".55" />
            <CookieFace cx={cx} cy={cy} r={60} dough={tint.dough} chunk={tint.chunk} chunk2={tint.chunk2} seed={i + 2} count={7} />
          </g>
        );
      })}
      {/* lead cookie in front, matching the hero's roll (rotated 200deg) */}
      <g transform="rotate(200 200 268)">
        <circle cx="203" cy="273" r="74" fill="#9A6424" opacity=".55" />
        <CookieFace cx={200} cy={268} r={74} dough={tint.dough} chunk={tint.chunk} chunk2={tint.chunk2} seed={11} count={10} />
      </g>
    </g>
  );
}

function ThickCookie({ cx, cy, rx = 124, ry = 36, h = 30, tint, seed }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy + h} rx={rx} ry={ry} fill="#8A5A2B" />
      <rect x={cx - rx} y={cy} width={rx * 2} height={h} fill="#A86E33" />
      <path d={`M${cx - rx} ${cy + h * 0.6} q${rx * 0.5} ${h * 0.5} ${rx} 0 t${rx} 0`} stroke="#8A5A2B" strokeWidth="3" fill="none" opacity=".6" />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={tint.dough} />
      <g transform={`translate(${cx} ${cy}) scale(1 ${ry / rx}) translate(${-cx} ${-cy})`}>
        <Chunks cx={cx} cy={cy} r={rx} count={11} color={tint.chunk} color2={tint.chunk2} seed={seed} />
      </g>
      <ellipse cx={cx - rx * 0.25} cy={cy - ry * 0.25} rx={rx * 0.45} ry={ry * 0.35} fill="#fff" opacity=".1" />
    </g>
  );
}

export function SoftStack({ tint, filled }) {
  const id = useId().replace(/:/g, '');
  const layers = [
    { cx: 202, cy: 300 },
    { cx: 194, cy: 252 },
    { cx: 206, cy: 204 },
  ];
  const top = { cx: 200, cy: 156 };
  return (
    <g>
      <defs>
        <clipPath id={`l${id}`}>
          <rect x="0" y="0" width="200" height="400" />
        </clipPath>
        <clipPath id={`r${id}`}>
          <rect x="200" y="0" width="200" height="400" />
        </clipPath>
      </defs>
      <ellipse cx="200" cy="350" rx="160" ry="16" fill="#4B2E1F" opacity=".12" />
      {layers.map((l, i) => (
        <ThickCookie key={i} {...l} tint={tint} seed={i + 3} />
      ))}
      {filled ? (
        <g>
          {/* filling revealed between the two halves */}
          <rect x="176" y={top.cy - 30} width="48" height="62" rx="18" fill={tint.filling} />
          <path d={`M188 ${top.cy + 28} q4 26 10 0 q6 18 12 0`} fill={tint.filling} />
          <motion.g initial={{ x: 0 }} animate={{ x: -18 }} transition={{ ...spring, delay: 0.25 }}>
            <g clipPath={`url(#l${id})`}>
              <ThickCookie {...top} tint={tint} seed={9} />
            </g>
          </motion.g>
          <motion.g initial={{ x: 0 }} animate={{ x: 18 }} transition={{ ...spring, delay: 0.25 }}>
            <g clipPath={`url(#r${id})`}>
              <ThickCookie {...top} tint={tint} seed={9} />
            </g>
          </motion.g>
        </g>
      ) : (
        <ThickCookie {...top} tint={tint} seed={9} />
      )}
    </g>
  );
}

export function BiscottiFan({ tint }) {
  const angles = [-48, -29, -10, 10, 29, 48];
  return (
    <g>
      <ellipse cx="200" cy="360" rx="160" ry="14" fill="#4B2E1F" opacity=".1" />
      {angles.map((a, i) => (
        <g key={a} transform={`rotate(${a} 200 340)`}>
          <path d="M168 336 C150 250 160 150 200 70 C240 150 250 250 232 336 Z" fill="#B57A2E" />
          <path d="M175 330 C160 252 168 160 200 88 C232 160 240 252 225 330 Z" fill={tint.dough} />
          <Chunks cx={200} cy={220} r={40} count={9} color={tint.chunk} color2={tint.chunk2} seed={i + 5} size={0.8} />
          <Chunks cx={200} cy={290} r={26} count={4} color={tint.chunk} color2={tint.chunk2} seed={i + 15} size={0.7} />
        </g>
      ))}
    </g>
  );
}
