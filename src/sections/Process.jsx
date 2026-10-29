// SCENE 4 — MADE FRESH, ONLY WHEN YOU ORDER (pinned, scrub, end '+=250%').
// onUpdate(progress) drives the current step; the visual is one storyboard.
import { useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { useScene, useSite } from '../lib/site';
import { centreWithin, offsetWithin, splitWords } from '../lib/dom';
import { brand } from '../data/content';
import { BiteDivider, Frame, LeafSprig, VegMark } from '../components/Decor';
import { HeartIcon, ScooterIcon } from '../components/Icons';
import { CookieFace } from '../components/CookieArt';

const steps = [
  {
    title: 'Pre-order',
    lines: [brand.preOrderLines[0], brand.advance, brand.contactLine],
  },
  {
    title: 'Baked fresh',
    lines: [brand.preOrderLines[1]],
  },
  {
    title: 'Delivered or picked up',
    lines: [`${brand.delivery} ${brand.deliveryNote}`, brand.selfPickup],
  },
];

function Highlight({ text }) {
  // Emphasise the source's capitalised phrases.
  const m = text.match(/^(.*?)(1–2 DAYS IN ADVANCE\.)$/);
  if (m) {
    return (
      <>
        {m[1]}
        <mark className="chip-mark">{m[2]}</mark>
      </>
    );
  }
  return text;
}

function ProcessVisual() {
  return (
    <div className="pv" aria-hidden="true">
      <svg className="pv-table" viewBox="0 0 600 20" preserveAspectRatio="none">
        <path d="M0 4H600" stroke="#C9B98F" strokeWidth="2" />
        <path d="M0 12H600" stroke="#C9B98F" strokeWidth="1" strokeDasharray="2 6" />
      </svg>

      {/* Phone + chat bubble */}
      <div className="pv-phone">
        <svg viewBox="0 0 90 160">
          <rect x="3" y="3" width="84" height="154" rx="14" fill="#1F4A2C" />
          <rect x="9" y="16" width="72" height="128" rx="6" fill="#F8F4EC" />
          <rect x="34" y="8" width="22" height="3" rx="1.5" fill="#DCE6CF" />
          <rect x="16" y="26" width="44" height="10" rx="5" fill="#DCE6CF" />
          <rect x="30" y="44" width="44" height="10" rx="5" fill="#25D366" opacity=".7" />
          <rect x="16" y="62" width="34" height="10" rx="5" fill="#DCE6CF" />
        </svg>
      </div>
      {/* Sample UI copy (not from the source menu) */}
      <div className="pv-bubble">1 box of cookies, please!</div>

      {/* Baking tray with 4 dough balls -> cookies */}
      <div className="pv-tray">
        <svg viewBox="0 0 240 40" className="pv-tray-svg">
          <rect x="4" y="8" width="232" height="26" rx="6" fill="#9AA3A0" />
          <rect x="12" y="4" width="216" height="22" rx="4" fill="#C9CFCB" />
          <rect x="18" y="8" width="204" height="14" rx="3" fill="#F3EBDD" />
        </svg>
        <div className="pv-doughs">
          {[0, 1, 2, 3].map((i) => (
            <div className="pv-dough" key={i}>
              <span className="pv-glow" />
              <svg viewBox="0 0 60 60" className="pv-ball">
                <ellipse cx="30" cy="34" rx="22" ry="20" fill="#EBD3A4" />
                <ellipse cx="24" cy="26" rx="8" ry="5" fill="#fff" opacity=".4" />
                <circle cx="34" cy="38" r="2.5" fill="#4B2E1F" />
                <circle cx="24" cy="40" r="2" fill="#4B2E1F" />
              </svg>
              <svg viewBox="0 0 60 60" className="pv-baked">
                <CookieFace cx={30} cy={34} r={24} seed={i + 2} count={5} />
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* Kraft gift box */}
      <div className="pv-box">
        <div className="pv-box-body">
          <svg viewBox="0 0 200 150" className="pv-box-back">
            <path d="M14 40h172l-8-26H22z" fill="#B98552" />
            <rect x="14" y="40" width="172" height="14" fill="#8F6238" />
          </svg>
          <div className="pv-box-contents">
            <svg viewBox="0 0 200 60">
              <rect x="0" y="0" width="200" height="60" fill="#F6EEDC" />
              {[30, 70, 110, 150].map((x, i) => (
                <CookieFace key={x} cx={x + 10} cy={34} r={20} seed={i + 4} count={4} />
              ))}
            </svg>
          </div>
          <svg viewBox="0 0 200 150" className="pv-box-front">
            <path d="M14 54h172v86H14z" fill="#C8955F" />
            <path d="M14 54h172v8H14z" fill="#A9763F" />
            <path d="M14 140h172" stroke="#8F6238" strokeWidth="2" />
            <path className="pv-ribbon draw-path" d="M100 0v150" stroke="#7E9A6E" strokeWidth="10" fill="none" />
          </svg>
          <svg viewBox="0 0 200 70" className="pv-lid">
            <rect x="6" y="14" width="188" height="50" rx="4" fill="#D3A26B" />
            <rect x="6" y="56" width="188" height="8" fill="#A9763F" />
            <path className="pv-ribbon draw-path" d="M100 64V14 M100 14c-26-16-46 0-14 4 M100 14c26-16 46 0 14 4" stroke="#7E9A6E" strokeWidth="7" fill="none" strokeLinecap="round" />
          </svg>
        </div>
        <div className="pv-tag">
          <span className="pv-tag-string" />
          <span className="pv-tag-card">
            <HeartIcon width="12" height="12" />
            made with love
          </span>
        </div>
      </div>

      {/* Scooter route */}
      <svg className="pv-route" viewBox="0 0 220 60" preserveAspectRatio="none">
        <path className="draw-path" d="M0 44 C60 44 90 20 150 26 S210 40 220 36" stroke="#7E9A6E" strokeWidth="2" strokeDasharray="0" fill="none" />
      </svg>
      <ScooterIcon className="pv-scooter" />
    </div>
  );
}

export default function Process() {
  const scope = useRef(null);
  const { reduced } = useSite();
  const [step, setStep] = useState(reduced ? 2 : 0);
  const stepRef = useRef(step);

  useScene(() => {
    const section = scope.current;
    const q = gsap.utils.selector(section);
    const pv = q('.pv')[0];
    const doughs = q('.pv-dough');
    const target = q('.pv-box-contents')[0];
    const box = q('.pv-box')[0];

    // Hop distance from each dough ball to the box opening (untransformed offsets).
    const hop = (el) => {
      const from = centreWithin(el, pv);
      const to = centreWithin(target, pv);
      return { x: to.x - from.x, y: to.y - from.y };
    };

    q('.draw-path').forEach((p) => {
      const len = p.getTotalLength();
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
    });

    // Scene 4 — headline word by word, before the pin
    gsap.fromTo(
      q('.pr-word'),
      { yPercent: 80, autoAlpha: 0, filter: 'blur(8px)' },
      {
        yPercent: 0,
        autoAlpha: 1,
        filter: 'blur(0px)',
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top 90%', end: 'top 25%', scrub: 1 },
      },
    );

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=250%',
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          const next = p < 0.33 ? 0 : p < 0.66 ? 1 : 2;
          if (next !== stepRef.current) {
            stepRef.current = next;
            setStep(next);
          }
        },
      },
    });

    // --- Step 1 "Pre-order" (0 – 1.3) ---
    tl.fromTo(q('.pv-phone'), { xPercent: -160, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 0.45, ease: 'power3.out' }, 0.05)
      .fromTo(
        q('.pv-bubble'),
        { scale: 0, autoAlpha: 0, transformOrigin: '0% 100%' },
        { scale: 1, autoAlpha: 1, duration: 0.35, ease: 'back.out(3)' },
        0.5,
      );

    // --- Step 2 "Baked fresh" (1.35 – 2.65) ---
    tl.fromTo(q('.pv-tray'), { yPercent: 120, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.35, ease: 'power3.out' }, 1.35);
    doughs.forEach((d, i) => {
      const at = 1.72 + i * 0.12;
      const ball = d.querySelector('.pv-ball');
      const baked = d.querySelector('.pv-baked');
      const glow = d.querySelector('.pv-glow');
      // squash flat into a cookie, with a warm glow pulse
      tl.to(ball, { scaleY: 0.55, scaleX: 1.25, transformOrigin: '50% 100%', duration: 0.1 }, at)
        .to(ball, { autoAlpha: 0, duration: 0.06 }, at + 0.08)
        .fromTo(baked, { autoAlpha: 0, scale: 1.2 }, { autoAlpha: 1, scale: 1, duration: 0.12, ease: 'back.out(2)' }, at + 0.08)
        .fromTo(glow, { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 0.9, scale: 1.3, duration: 0.08 }, at + 0.06)
        .to(glow, { autoAlpha: 0, scale: 1.6, duration: 0.12 }, at + 0.14);
      // hop one by one into the box
      const h0 = 2.2 + i * 0.08;
      tl.to(d, { x: () => hop(d).x, duration: 0.24, ease: 'none' }, h0)
        .to(d, { y: () => Math.min(hop(d).y, 0) - 60, duration: 0.12, ease: 'power2.out' }, h0)
        .to(d, { y: () => hop(d).y, duration: 0.12, ease: 'power2.in' }, h0 + 0.12)
        .to(d, { autoAlpha: 0, duration: 0.04 }, h0 + 0.22);
    });
    // the box fills from the bottom
    tl.fromTo(q('.pv-box-contents'), { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.42 }, 2.24);

    // --- Step 3 "Delivered or picked up" (2.75 – 3.65) ---
    tl.fromTo(q('.pv-lid'), { yPercent: -260, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.3, ease: 'bounce.out' }, 2.75)
      .to(q('.pv-box-body'), { scaleY: 0.9, scaleX: 1.05, transformOrigin: '50% 100%', duration: 0.05 }, 2.86)
      .to(q('.pv-box-body'), { scaleY: 1, scaleX: 1, duration: 0.3, ease: 'elastic.out(1, 0.35)' }, 2.91)
      .to(q('.pv-ribbon'), { strokeDashoffset: 0, duration: 0.2, ease: 'power1.inOut' }, 3.05)
      .fromTo(
        q('.pv-tag'),
        { autoAlpha: 0, rotate: 12, transformOrigin: '50% 0%' },
        { autoAlpha: 1, keyframes: { rotate: [12, -8, 0], easeEach: 'sine.inOut' }, duration: 0.3 },
        3.18,
      )
      .to(q('.pv-route .draw-path'), { strokeDashoffset: 0, duration: 0.18 }, 3.28)
      .fromTo(q('.pv-scooter'), { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0, duration: 0.12 }, 3.36)
      .to(box, { x: () => pv.offsetWidth - offsetWithin(box, pv).x + 40, y: () => -pv.offsetHeight * 0.04, duration: 0.22, ease: 'power2.in' }, 3.43);

    // Hold
    tl.to({}, { duration: 0.5 });
  }, scope);

  return (
    <section className="section process" ref={scope} aria-labelledby="pr-title">
      <BiteDivider color="var(--paper)" />
      <div className="framed process-frame">
        <Frame />
        <VegMark className="corner-veg" />
        <header className="section-head">
          <LeafSprig />
          <h2 id="pr-title" className="display">
            {splitWords('We make everything fresh on order.', 'pr-word')}
          </h2>
          <LeafSprig flip />
        </header>
        <div className="process-grid">
          <ol className="steps">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className={`step ${i <= step ? 'is-lit' : ''} ${i === step ? 'is-active' : ''}`}
                aria-current={i === step ? 'step' : undefined}
              >
                <span className="step-num">{i + 1}</span>
                <div>
                  <h3 className="step-title">{s.title}</h3>
                  {s.lines.map((l) => (
                    <p key={l}>
                      <Highlight text={l} />
                    </p>
                  ))}
                </div>
              </li>
            ))}
          </ol>
          <ProcessVisual />
        </div>
      </div>
    </section>
  );
}
