// SCENE 8 — A SMALL KITCHEN NEAR PALDA (normal scroll).
// polaroid (outer): GSAP bounce drop, scrubbed. polaroid-img: GSAP parallax 1.3 -> 1.
import { useRef } from 'react';
import { gsap } from '../lib/gsap';
import { useScene } from '../lib/site';
import { splitWords } from '../lib/dom';
import { assetUrl } from '../lib/assets';
import { brand } from '../data/content';
import { BiteDivider, Frame, LeafSprig, VegMark } from '../components/Decor';
import { InstagramIcon, PinIcon } from '../components/Icons';
import { CookieFace } from '../components/CookieArt';

const polaroids = [
  { name: 'polaroid-kitchen', caption: '[placeholder photo: the kitchen]', tilt: -3 },
  { name: 'polaroid-dough', caption: '[placeholder photo: hands shaping cookie dough]', tilt: 2 },
  { name: 'polaroid-gift-boxes', caption: '[placeholder photo: packed gift boxes]', tilt: -2 },
];

function PolaroidFallback({ name }) {
  if (name === 'polaroid-kitchen') {
    return (
      <svg viewBox="0 0 200 160" aria-hidden="true">
        <rect width="200" height="160" fill="#E3EBD6" />
        <rect x="0" y="100" width="200" height="60" fill="#C8955F" />
        <rect x="20" y="30" width="60" height="50" rx="4" fill="#FFFDF8" stroke="#7E9A6E" strokeWidth="3" />
        <path d="M50 30v50M20 55h60" stroke="#7E9A6E" strokeWidth="2" />
        <rect x="110" y="62" width="64" height="38" rx="4" fill="#1F4A2C" />
        <circle cx="128" cy="80" r="6" fill="#D4943F" />
        <path d="M30 100c0-14 30-14 30 0z" fill="#FFFDF8" stroke="#C9B98F" strokeWidth="2" />
      </svg>
    );
  }
  if (name === 'polaroid-dough') {
    return (
      <svg viewBox="0 0 200 160" aria-hidden="true">
        <rect width="200" height="160" fill="#F3E6CC" />
        <ellipse cx="100" cy="96" rx="40" ry="30" fill="#EBD3A4" />
        <circle cx="90" cy="100" r="4" fill="#4B2E1F" />
        <circle cx="112" cy="90" r="3.5" fill="#4B2E1F" />
        <path d="M20 40c30 10 50 30 56 50l-14 8C50 76 34 62 14 56z" fill="#D9A877" />
        <path d="M180 40c-30 10-50 30-56 50l14 8c12-22 28-36 48-42z" fill="#D9A877" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 160" aria-hidden="true">
      <rect width="200" height="160" fill="#E9D9C4" />
      <rect x="30" y="60" width="80" height="70" fill="#C8955F" />
      <rect x="30" y="52" width="80" height="14" fill="#D3A26B" />
      <path d="M70 52v78" stroke="#7E9A6E" strokeWidth="7" />
      <rect x="110" y="80" width="60" height="50" fill="#B98552" />
      <rect x="110" y="74" width="60" height="10" fill="#D3A26B" />
      <path d="M140 74v56" stroke="#7E9A6E" strokeWidth="5" />
      <g transform="translate(118 26)">
        <CookieFace cx={20} cy={20} r={16} seed={4} count={4} />
      </g>
    </svg>
  );
}

export default function Kitchen() {
  const scope = useRef(null);

  useScene(() => {
    const q = gsap.utils.selector(scope);
    // Scene 8 — headline words
    gsap.fromTo(
      q('.kt-word'),
      { yPercent: 80, autoAlpha: 0, filter: 'blur(8px)' },
      {
        yPercent: 0,
        autoAlpha: 1,
        filter: 'blur(0px)',
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: q('.kt-title')[0], start: 'top 95%', end: 'top 55%', scrub: 1 },
      },
    );
    // Scene 8 — polaroids drop in with bounce.out (scrubbed); tilt is their resting CSS rotate
    q('.polaroid').forEach((p, i) => {
      gsap.from(p, {
        y: -220,
        rotate: i % 2 ? 14 : -14,
        autoAlpha: 0,
        ease: 'bounce.out',
        scrollTrigger: { trigger: q('.polaroids')[0], start: `top ${95 - i * 6}%`, end: `top ${45 - i * 6}%`, scrub: 1 },
      });
    });
    // Scene 8 — parallax inside each frame: inner image 1.3 -> 1 across the viewport
    q('.polaroid-img').forEach((img) => {
      gsap.fromTo(
        img,
        { scale: 1.3 },
        { scale: 1, ease: 'none', scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true } },
      );
    });
  }, scope);

  return (
    <section id="visit" className="section kitchen" ref={scope} aria-labelledby="kt-title">
      <BiteDivider color="var(--paper)" />
      <div className="framed">
        <Frame />
        <VegMark className="corner-veg" />
        <header className="section-head">
          <LeafSprig />
          <h2 id="kt-title" className="kt-title display">
            {splitWords('A small kitchen near Palda.', 'kt-word')}
          </h2>
          <LeafSprig flip />
        </header>

        <div className="kitchen-grid">
          <div className="kitchen-copy">
            <p className="loc">
              <PinIcon width="22" height="22" />
              <span>
                <strong>{brand.location}</strong> {brand.locationNote}
              </span>
            </p>
            <p className="loc">
              <PinIcon width="22" height="22" />
              <span>{brand.pickup}</span>
            </p>
            <p className="placeholder">[placeholder: founder story — name, how it started, 2–3 sentences]</p>
            <a className="insta-card" href={brand.instagramUrl} target="_blank" rel="noreferrer">
              <InstagramIcon width="30" height="30" />
              <span>
                <small>Follow us on Instagram</small>
                <strong>{brand.instagram}</strong>
              </span>
            </a>
          </div>

          <div className="polaroids">
            {polaroids.map((p) => {
              const url = assetUrl(p.name);
              return (
                <figure className="polaroid" key={p.name} style={{ '--tilt': `${p.tilt}deg` }}>
                  <span className="washi" aria-hidden="true" />
                  <div className="polaroid-frame">
                    <div className="polaroid-img">
                      {url ? <img src={url} alt={p.caption.replace(/^\[placeholder photo: |\]$/g, '')} loading="lazy" /> : <PolaroidFallback name={p.name} />}
                    </div>
                  </div>
                  <figcaption>{p.caption}</figcaption>
                </figure>
              );
            })}
          </div>
        </div>

        <ul className="trust-strip" aria-label="Our promise">
          {brand.trust.map((t, i) => (
            <li key={t}>
              {i > 0 && <span aria-hidden="true">|</span>}
              {t}
            </li>
          ))}
        </ul>

        <div className="reviews">
          <p className="placeholder">[placeholder: 2–3 customer reviews]</p>
        </div>

        <p className="thanks script">{brand.thanks}</p>
      </div>
    </section>
  );
}
