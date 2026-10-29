// Flat placeholder illustrations for menu cards and box tiles, one per art
// kind. If /src/assets/card-<kind>.webp|png exists, the photo is used instead.
// No egg imagery anywhere — the brand is 100% eggless.
import { artTints } from '../data/content';
import { assetUrl } from '../lib/assets';
import { CookieFace, Chunks } from './CookieArt';

const shadow = <ellipse cx="60" cy="88" rx="42" ry="6" fill="#4B2E1F" opacity=".12" />;

function Brownie({ t }) {
  return (
    <g>
      {shadow}
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(${i * 30 - 16} ${i * -14})`}>
          <path d="M26 54l30-10 30 10v22l-30 10-30-10z" fill="#3A2216" />
          <path d="M26 54l30-10 30 10-30 10z" fill={t.dough} />
          <path d="M26 54l30 10v22l-30-10z" fill="#4B2E1F" />
          <Chunks cx={56} cy={54} r={18} count={5} color="#2A170D" color2="#D4943F" seed={i + 4} />
        </g>
      ))}
    </g>
  );
}

function Cookie({ t, soft }) {
  return (
    <g>
      {shadow}
      {soft ? (
        <>
          <ellipse cx="60" cy="74" rx="40" ry="12" fill="#9A6424" />
          <rect x="20" y="58" width="80" height="16" fill="#B57A2E" />
          <ellipse cx="60" cy="58" rx="40" ry="13" fill={t.dough} />
          <Chunks cx={60} cy={58} r={30} count={7} color={t.chunk} seed={2} />
        </>
      ) : (
        <>
          <CookieFace cx={44} cy={58} r={26} dough={t.dough} chunk={t.chunk} seed={3} count={6} />
          <CookieFace cx={76} cy={50} r={26} dough={t.dough} chunk={t.chunk} seed={5} count={6} />
        </>
      )}
    </g>
  );
}

function Biscotti({ t }) {
  return (
    <g>
      {shadow}
      {[-18, 0, 18].map((a, i) => (
        <g key={a} transform={`rotate(${a} 60 92)`}>
          <path d="M48 84c-4-22-2-44 12-60 14 16 16 38 12 60z" fill={t.dough} stroke="#B57A2E" strokeWidth="2" />
          <Chunks cx={60} cy={56} r={14} count={6} color={t.chunk} color2="#A8323E" seed={i + 8} />
        </g>
      ))}
    </g>
  );
}

function Tresleches() {
  return (
    <g>
      {shadow}
      <path d="M22 44h76l-6 40H28z" fill="#FFFDF8" stroke="#C9B98F" strokeWidth="2" />
      <rect x="27" y="58" width="66" height="22" fill="#F1DDB0" />
      <rect x="27" y="72" width="66" height="8" fill="#E8C98A" opacity=".8" />
      <path d="M26 58c8-10 14 0 22-6s14 4 22-4 14 2 24 2v6H26z" fill="#FFFDF8" />
      <circle cx="44" cy="50" r="4" fill="#D4943F" />
      <circle cx="72" cy="48" r="4" fill="#7E9A6E" />
    </g>
  );
}

function TeaCake({ t }) {
  return (
    <g>
      {shadow}
      <path d="M18 50c0-10 8-16 22-16h40c14 0 22 6 22 16v30H18z" fill="#B57A2E" />
      <path d="M18 50c0-10 8-16 22-16h40c14 0 22 6 22 16-14 4-70 4-84 0z" fill="#8A5A2B" />
      <path d="M86 44h16v36H86z" fill={t.dough} />
      <Chunks cx={94} cy={62} r={9} count={4} color={t.chunk} seed={6} />
      <path d="M30 38q6-6 12 0M54 36q6-6 12 0" stroke="#FFFDF8" strokeWidth="2" fill="none" opacity=".5" />
    </g>
  );
}

function Tin() {
  return (
    <g>
      {shadow}
      <ellipse cx="60" cy="80" rx="40" ry="10" fill="#163822" />
      <rect x="20" y="46" width="80" height="34" fill="#1F4A2C" />
      <ellipse cx="60" cy="46" rx="40" ry="10" fill="#2C5E3B" />
      <rect x="20" y="58" width="80" height="6" fill="#D4943F" />
      <CookieFace cx={60} cy={40} r={14} seed={2} count={4} />
    </g>
  );
}

function Tub({ t }) {
  return (
    <g>
      {shadow}
      <path d="M28 36h64l-6 48H34z" fill="#FFFDF8" opacity=".6" stroke="#C9B98F" strokeWidth="2" />
      <path d="M31 62h58l-3 22H34z" fill="#C98A45" />
      <path d="M30 52h60l-1 10H31z" fill="#D4943F" />
      <path d="M29 42h62l-1 10H30z" fill={t.dough} />
      <path d="M34 42c8 6 16-4 24 2s16-4 24 0" stroke="#3A2216" strokeWidth="3" fill="none" />
    </g>
  );
}

function Loaf({ t }) {
  return (
    <g>
      {shadow}
      <path d="M14 52c0-12 10-18 24-18h30v46H14z" fill="#C98A45" />
      <path d="M14 52c0-12 10-18 24-18h30c-8 6-40 10-54 18z" fill="#9A6424" />
      <g transform="translate(10 -4) rotate(8 86 60)">
        <rect x="74" y="38" width="20" height="44" rx="3" fill={t.dough} />
        <Chunks cx={84} cy={60} r={11} count={5} color={t.chunk} seed={9} />
      </g>
    </g>
  );
}

function Bomboloni() {
  return (
    <g>
      {shadow}
      {[
        [36, 62, '#F6EEDC'],
        [84, 62, '#5A3420'],
        [60, 44, '#C49A6C'],
      ].map(([x, y, fill]) => (
        <g key={x}>
          <circle cx={x} cy={y} r="22" fill="#D9A25A" />
          <circle cx={x} cy={y} r="22" fill="none" stroke="#B57A2E" strokeWidth="2" />
          <ellipse cx={x - 2} cy={y - 6} rx="14" ry="6" fill="#fff" opacity=".35" />
          <circle cx={x + 6} cy={y - 2} r="7" fill={fill} stroke="#fff" strokeOpacity=".6" />
        </g>
      ))}
    </g>
  );
}

const kinds = {
  brownie: Brownie,
  cookie: (p) => <Cookie {...p} />,
  'cookie-soft': (p) => <Cookie {...p} soft />,
  biscotti: Biscotti,
  tresleches: Tresleches,
  teacake: TeaCake,
  tin: Tin,
  tub: Tub,
  loaf: Loaf,
  bomboloni: Bomboloni,
};

export default function FoodArt({ kind, className = '', alt = '' }) {
  const photo = assetUrl(`card-${kind}`);
  if (photo) return <img className={`food-art ${className}`} src={photo} alt={alt} loading="lazy" />;
  const Comp = kinds[kind] ?? kinds.cookie;
  const t = artTints[kind] ?? artTints.cookie;
  return (
    <svg className={`food-art ${className}`} viewBox="0 0 120 100" role={alt ? 'img' : undefined} aria-label={alt || undefined} aria-hidden={alt ? undefined : true}>
      <Comp t={t} />
    </svg>
  );
}
