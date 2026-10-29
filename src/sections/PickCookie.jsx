// SCENE 3 — PICK YOUR COOKIE (normal scroll).
// cookie-showcase-outer: GSAP (scrubbed entrance). cookie-showcase-inner: Motion (swaps).
// pill-outer: GSAP (staggered rise). pill-inner: Motion (selected, layoutId, hover).
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { gsap } from '../lib/gsap';
import { useScene } from '../lib/site';
import { splitWords } from '../lib/dom';
import { useOrder } from '../lib/order';
import { sectionById, formatPrice } from '../data/content';
import { BiteDivider, Frame, LeafSprig, VegMark } from '../components/Decor';
import { CrunchyFan, SoftStack, BiscottiFan } from './CookieVisuals';

const cookieLines = sectionById.cookies.groups; // crunchy, soft-baked, biscottis
const MAX_PILLS = Math.max(...cookieLines.map((g) => g.items.length));
const popSpring = { type: 'spring', stiffness: 380, damping: 15, mass: 0.8 };

function Visual({ line, item }) {
  const tint = item.tint;
  return (
    <motion.svg
      className="showcase-svg"
      viewBox="0 0 400 400"
      role="img"
      aria-label={`${line.title}: ${item.name}`}
      initial={{ scale: 0.55, y: -40, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1, transition: popSpring }}
      exit={{
        scaleY: [1, 0.85, 0.85],
        scaleX: [1, 1.06, 1.06],
        y: [0, 0, 140],
        opacity: [1, 1, 0],
        transition: { duration: 0.42, times: [0, 0.3, 1], ease: 'easeIn' },
      }}
      style={{ originY: 1 }}
    >
      {line.id === 'crunchy' && <CrunchyFan tint={tint} />}
      {line.id === 'soft-baked' && <SoftStack tint={tint} filled={!!item.centerFilled} />}
      {line.id === 'biscottis' && <BiscottiFan tint={tint} />}
    </motion.svg>
  );
}

export default function PickCookie() {
  const scope = useRef(null);
  const priceRef = useRef(null);
  const priceObj = useRef({ v: cookieLines[0].items[0].price });
  const [lineIdx, setLineIdx] = useState(0);
  const [itemIdx, setItemIdx] = useState(0);
  const { add } = useOrder();

  const line = cookieLines[lineIdx];
  const item = line.items[itemIdx];

  // Price counter: GSAP tween on a plain object (writes text only).
  useEffect(() => {
    const tween = gsap.to(priceObj.current, {
      v: item.price,
      duration: 0.7,
      ease: 'power2.out',
      onUpdate: () => {
        if (priceRef.current) priceRef.current.textContent = formatPrice('rs', Math.round(priceObj.current.v));
      },
    });
    return () => tween.kill();
  }, [item.price]);

  useScene(() => {
    const q = gsap.utils.selector(scope);

    // Scene 3 — headline word by word (scrubbed)
    gsap.fromTo(
      q('.pc-word'),
      { yPercent: 80, autoAlpha: 0, filter: 'blur(8px)' },
      {
        yPercent: 0,
        autoAlpha: 1,
        filter: 'blur(0px)',
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: q('.pc-title')[0], start: 'top 95%', end: 'top 50%', scrub: 1 },
      },
    );

    // Scene 3 — showcase entrance: y 120, rotate -15 -> rest (outer only)
    gsap.fromTo(
      q('.cookie-showcase-outer'),
      { y: 120, rotate: -15 },
      {
        y: 0,
        rotate: 0,
        ease: 'none',
        scrollTrigger: { trigger: q('.cookie-showcase-outer')[0], start: 'top 95%', end: 'top 50%', scrub: 1 },
      },
    );

    // Scene 3 — pills rise, staggered (outer only)
    gsap.fromTo(
      q('.pill-outer'),
      { y: 40, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        stagger: 0.12,
        ease: 'none',
        scrollTrigger: { trigger: q('.pc-pills')[0], start: 'top 95%', end: 'top 60%', scrub: 1 },
      },
    );
  }, scope);

  const chooseLine = (i) => {
    setLineIdx(i);
    setItemIdx(0); // first flavour selected by default
  };

  return (
    <section id="cookies" className="section pick" ref={scope} aria-labelledby="pc-title">
      <BiteDivider color="var(--cream)" />
      <div className="framed">
        <Frame />
        <VegMark className="corner-veg" />
        <header className="section-head">
          <LeafSprig />
          <h2 id="pc-title" className="pc-title display">
            {splitWords('Pick your kind of cookie.', 'pc-word')}
          </h2>
          <LeafSprig flip />
        </header>

        <div className="pick-grid">
          <div className="showcase-col">
            <div className="cookie-showcase-outer">
              <motion.div className="cookie-showcase-inner" layout={false}>
                <AnimatePresence initial={false}>
                  <Visual key={`${line.id}-${item.id}`} line={line} item={item} />
                </AnimatePresence>
              </motion.div>
            </div>
            <AnimatePresence>
              {line.id === 'soft-baked' && (
                <motion.p
                  className="side-note"
                  aria-hidden="true"
                  initial={{ opacity: 0, rotate: -12, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: -5, scale: 1, transition: popSpring }}
                  exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.2 } }}
                >
                  Giant New York style
                  <svg viewBox="0 0 90 60">
                    <path d="M80 6 C60 10 30 18 14 48" />
                    <path d="M8 36 L13 50 L27 44" />
                  </svg>
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="pick-controls">
            <div className="tabs" role="group" aria-label="Cookie line">
              {cookieLines.map((g, i) => (
                <button
                  key={g.id}
                  type="button"
                  className={`tab ${i === lineIdx ? 'is-active' : ''}`}
                  aria-pressed={i === lineIdx}
                  onClick={() => chooseLine(i)}
                >
                  {g.title}
                </button>
              ))}
            </div>
            <p className="tagline" aria-live="polite">
              {line.tagline}
            </p>

            <div className="pc-pills" role="group" aria-label="Flavour">
              {Array.from({ length: MAX_PILLS }, (_, i) => {
                const flavour = line.items[i];
                return (
                  <div key={i} className={`pill-outer ${flavour ? '' : 'is-empty'}`}>
                    {flavour && (
                      <motion.button
                        type="button"
                        className={`pill-inner ${i === itemIdx ? 'is-selected' : ''}`}
                        aria-pressed={i === itemIdx}
                        onClick={() => setItemIdx(i)}
                        animate={{ scale: i === itemIdx ? 1.06 : 1 }}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                      >
                        {i === itemIdx && (
                          <motion.span className="pill-hl" layoutId="pill-highlight" transition={popSpring} />
                        )}
                        <span className="pill-label">{flavour.name}</span>
                      </motion.button>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pick-buy">
              <p className="pick-price">
                <span className="sr-only">
                  Price: {formatPrice('rs', item.price)}
                </span>
                {/* Text is written by the GSAP counter; React renders it once. */}
                <span ref={priceRef} className="price-big" aria-hidden="true">
                  {formatPrice('rs', cookieLines[0].items[0].price)}
                </span>
              </p>
              <motion.button
                type="button"
                className="btn btn-primary"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => add(item.id)}
              >
                Add to order
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
