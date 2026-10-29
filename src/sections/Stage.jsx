// Scenes 1 + 2 share ONE pinned stage. The hero cookie (.hero-cookie) is a
// single absolutely positioned element (left:0; top:0) moved only with
// transforms. It is never duplicated: the scene changes around it.
import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import { useSite, useScrollTo } from '../lib/site';
import { whenIntroDone, completeIntro } from '../lib/introGate';
import { offsetWithin, centreWithin, splitWords } from '../lib/dom';
import { badges, brand } from '../data/content';
import CookieArt from '../components/CookieArt';
import { BadgeSticker, BiteDivider, Frame, VegMark } from '../components/Decor';
import { LeafIcon, WhatsAppIcon } from '../components/Icons';
import { helloHref } from '../components/Nav';

const BADGE_TILTS = [-6, 4, -3, 6]; // NW, NE, SW, SE
const S2_HEADLINE = '100% eggless. No premixes. Just pure butter.';

function Bowl() {
  return (
    <>
      <svg className="bowl-back" viewBox="0 0 300 200" aria-hidden="true">
        <ellipse cx="150" cy="60" rx="140" ry="30" fill="#EFE7D8" />
        <ellipse cx="150" cy="64" rx="126" ry="22" fill="#E3D8C3" />
      </svg>
      <svg className="bowl-front" viewBox="0 0 300 200" aria-hidden="true" overflow="visible">
        <path
          d="M10 60 A140 30 0 0 0 290 60 C290 150 222 192 150 192 C78 192 10 150 10 60 Z"
          fill="#FFFDF8"
          stroke="#C9B98F"
          strokeWidth="2"
        />
        <path d="M24 98 C70 116 230 116 276 98" stroke="#DCE6CF" strokeWidth="9" fill="none" />
        <path d="M10 60 A140 30 0 0 0 290 60" stroke="#C9B98F" strokeWidth="3" fill="none" />
        <ellipse cx="150" cy="196" rx="54" ry="6" fill="#4B2E1F" opacity=".12" />
        {/* Stamp mark left by the rubber stamp: "100% EGGLESS" */}
        <g className="stamp-mark">
          <circle cx="150" cy="134" r="33" fill="none" stroke="#1E7A34" strokeWidth="3" />
          <circle cx="150" cy="134" r="27" fill="none" stroke="#1E7A34" strokeWidth="1.2" strokeDasharray="2 3" />
          <text x="150" y="129" textAnchor="middle" className="stamp-mark-text big" fill="#1E7A34">
            100%
          </text>
          <text x="150" y="145" textAnchor="middle" className="stamp-mark-text" fill="#1E7A34">
            EGGLESS
          </text>
          <path d="M141 156c0-5 4-8 9-9 0 5-3 8-9 9z M141 156l6-5" fill="#1E7A34" stroke="#1E7A34" strokeWidth="1" />
        </g>
      </svg>
    </>
  );
}

function RubberStamp() {
  return (
    <svg viewBox="0 0 100 140" aria-hidden="true">
      <circle cx="50" cy="22" r="18" fill="#B98A58" />
      <circle cx="44" cy="16" r="6" fill="#fff" opacity=".25" />
      <rect x="40" y="36" width="20" height="38" rx="6" fill="#A07446" />
      <rect x="12" y="72" width="76" height="40" rx="8" fill="#C49A6C" />
      <rect x="8" y="110" width="84" height="16" rx="5" fill="#1F4A2C" />
      <g transform="translate(34 76) scale(1)" color="#1F4A2C">
        <LeafIcon width="32" height="32" style={{ '--cream': '#C49A6C' }} />
      </g>
    </svg>
  );
}

function DoughBall() {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true">
      <ellipse cx="100" cy="108" rx="66" ry="62" fill="#EBD3A4" />
      <ellipse cx="82" cy="86" rx="26" ry="16" fill="#fff" opacity=".35" />
      <circle cx="118" cy="120" r="5" fill="#4B2E1F" />
      <circle cx="86" cy="132" r="4" fill="#4B2E1F" />
      <circle cx="124" cy="94" r="3.5" fill="#4B2E1F" />
    </svg>
  );
}

export default function Stage() {
  const { reduced, lenisRef } = useSite();
  const scrollTo = useScrollTo();
  const scope = useRef(null);
  const L = useRef(null); // layout stations, recomputed on every refresh

  useGSAP(
    (context, contextSafe) => {
      const stage = scope.current;
      const q = gsap.utils.selector(stage);

      if (reduced) {
        // Final states are the CSS defaults; just unlock the rest of the page.
        completeIntro();
        return undefined;
      }

      const cookie = q('.hero-cookie')[0];
      const heroSpot = q('.hero-spot')[0];
      const centreSpot = q('.s2-cookie-spot')[0];
      const slots = q('.s2-slot');
      const badgeEls = q('.s2-badge');
      const bowlWrap = q('.bowl-wrap')[0];
      const nav = document.querySelector('.site-nav');

      // layout(): pixel coordinates for each station from untransformed offsets.
      const layout = () => {
        const W = stage.offsetWidth;
        const H = stage.offsetHeight;
        const size = cookie.offsetWidth;
        const mobile = W < 760;
        const station = (el) => {
          const c = centreWithin(el, stage);
          return { x: c.x - size / 2, y: c.y - size / 2 };
        };
        const bowl = offsetWithin(bowlWrap, stage);
        const bw = bowlWrap.offsetWidth;
        const bh = bowlWrap.offsetHeight;
        const badgeSize = badgeEls[0]?.offsetWidth ?? 0;
        L.current = {
          W,
          H,
          mobile,
          hero: station(heroSpot),
          centre: { ...station(centreSpot), scale: mobile ? 1.05 : 1.3 },
          dough: { x: bowl.x + bw / 2 - size / 2, y: bowl.y + bh * 0.28 - size / 2 },
          slots: slots.map((s) => {
            const c = centreWithin(s, stage);
            return { x: c.x - badgeSize / 2, y: c.y - badgeSize / 2 };
          }),
        };
      };
      layout();

      // ---- Initial (pre-intro) states: an empty cream stage --------------
      gsap.set(nav, { yPercent: -120 });
      gsap.set(q('.hero-line-inner'), { yPercent: 110 });
      gsap.set(q('.hero-fade'), { autoAlpha: 0, y: 24 });
      q('.draw-path').forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.set(bowlWrap, { scale: 0, transformOrigin: '50% 85%' });
      gsap.set(q('.butter, .flour, .chunk, .stamp'), { autoAlpha: 0 });
      gsap.set(q('.stamp-mark'), { scale: 0, transformOrigin: '50% 50%' });
      gsap.set(cookie, { x: L.current.dough.x, y: L.current.dough.y, scale: 0.3, autoAlpha: 0 });
      gsap.set(q('.cookie-layer'), { autoAlpha: 0 });
      gsap.set(q('.hero-cookie .bite-1'), { scale: 0, transformOrigin: '50% 50%' });
      gsap.set(q('.s2-panel'), { yPercent: 105 });
      gsap.set(q('.s2-word'), { autoAlpha: 0 });
      gsap.set(badgeEls, { autoAlpha: 0 });
      gsap.set(q('.s2-gift'), { autoAlpha: 0 });

      // ================================================================
      // SCENE 1 — BIRTH (intro timeline on load, not scrubbed)
      // ================================================================
      const runIntro = () => {
        layout();
        const { H, hero, dough } = L.current;
        lenisRef.current?.lenis?.stop();
        document.documentElement.classList.add('is-locked');

        const tl = gsap.timeline({
          onComplete: () => {
            document.documentElement.classList.remove('is-locked');
            lenisRef.current?.lenis?.start();
            // ALL ScrollTriggers are created only now, then refreshed.
            completeIntro();
          },
        });

        // 0.0 — the empty bowl pops up
        tl.to(bowlWrap, { scale: 1, duration: 0.5, ease: 'back.out(2.5)' }, 0);

        // 0.4 — a pat of butter drops in and squashes on landing
        tl.fromTo(q('.butter'), { y: -H, autoAlpha: 1 }, { y: 0, duration: 0.5, ease: 'bounce.out' }, 0.4)
          .to(q('.butter'), { scaleY: 0.85, scaleX: 1.08, transformOrigin: '50% 100%', duration: 0.07 }, 0.9)
          .to(q('.butter'), { scaleY: 1, scaleX: 1, duration: 0.6, ease: 'elastic.out(1, 0.35)' }, 0.97);

        // 0.7 — twelve flour dots sift down
        tl.fromTo(
          q('.flour'),
          { y: -160, autoAlpha: 0 },
          { y: 0, autoAlpha: 0.95, duration: 0.55, ease: 'power1.in', stagger: 0.03 },
          0.7,
        );

        // 1.0 — rubber stamp drops, presses, lifts; leaves the "100% EGGLESS" mark
        tl.fromTo(q('.stamp'), { y: -H, autoAlpha: 1 }, { y: 0, duration: 0.35, ease: 'bounce.out' }, 1.0)
          .to(q('.stamp'), { scaleY: 0.8, transformOrigin: '50% 100%', duration: 0.07 }, 1.35)
          .to(q('.stamp'), { scaleY: 1, duration: 0.3, ease: 'elastic.out(1, 0.4)' }, 1.42)
          .to(q('.stamp'), { y: -H * 0.7, autoAlpha: 0, duration: 0.35, ease: 'power2.in' }, 1.55)
          .to(q('.stamp-mark'), { scale: 1, rotate: -6, duration: 0.45, ease: 'back.out(3)' }, 1.44);

        // 1.6 — six chocolate chunks drop in
        tl.fromTo(q('.chunk'), { y: -H, autoAlpha: 1 }, { y: 0, duration: 0.45, ease: 'bounce.out', stagger: 0.08 }, 1.6);

        // 2.0 — the bowl wobbles to mix (±6deg, three times); the mark rides along
        tl.to(bowlWrap, { keyframes: { rotate: [6, -6, 6, -6, 6, -6, 0], easeEach: 'sine.inOut' }, duration: 0.5 }, 2.0);

        // 2.4 — a dough ball pops out, the bowl slides away, the dough flies to the hero station
        tl.set(cookie, { autoAlpha: 1 }, 2.4)
          .fromTo(cookie, { y: dough.y }, { y: dough.y - H * 0.16, scale: 0.42, duration: 0.26, ease: 'power2.out' }, 2.4)
          .to(bowlWrap, { y: H, duration: 0.45, ease: 'power2.in' }, 2.5)
          .to(cookie, { x: hero.x, duration: 0.38, ease: 'power1.inOut' }, 2.62)
          .to(cookie, { y: hero.y, duration: 0.38, ease: 'power2.in' }, 2.62)
          .to(cookie, { scale: 1, duration: 0.38, ease: 'power1.out' }, 2.62)
          // lands: squash flat, elastic back, and crossfade dough -> cookie
          .to(cookie, { scaleY: 0.85, scaleX: 1.08, duration: 0.07, ease: 'power1.out' }, 3.0)
          .to(cookie, { scaleY: 1, scaleX: 1, duration: 0.6, ease: 'elastic.out(1, 0.35)' }, 3.07)
          .to(q('.dough'), { autoAlpha: 0, duration: 0.25 }, 3.0)
          .to(q('.cookie-layer'), { autoAlpha: 1, duration: 0.25 }, 3.0);

        // 2.9 (lands at ~3.15 here) — a bite from the top-right; three crumbs fly off and bounce
        tl.to(q('.hero-cookie .bite-1'), { scale: 1, duration: 0.16, ease: 'power3.out' }, 3.15);
        q('.hero-cookie .crumb').forEach((crumb, i) => {
          tl.fromTo(crumb, { x: 0, autoAlpha: 1 }, { x: 22 + i * 16, duration: 0.6, ease: 'power1.out' }, 3.15)
            .fromTo(crumb, { y: 0 }, { y: 70 + i * 22, duration: 0.6, ease: 'bounce.out' }, 3.15)
            .to(crumb, { autoAlpha: 0, duration: 0.3 }, 4.1);
        });

        // Headline rises line by line, then underline, note, sub, buttons, nav
        tl.to(q('.hero-line-inner'), { yPercent: 0, duration: 0.7, ease: 'back.out(1.4)', stagger: 0.12 }, 3.35)
          .to(q('.hero-underline .draw-path'), { strokeDashoffset: 0, duration: 0.5, ease: 'power2.inOut' }, 3.85)
          .to(q('.hero-sub, .hero-btn'), { autoAlpha: 1, y: 0, duration: 0.5, ease: 'back.out(2.5)', stagger: 0.08 }, 3.75)
          .to(q('.hero-note'), { autoAlpha: 1, y: 0, duration: 0.5, ease: 'back.out(2.5)' }, 4.0)
          .to(q('.hero-note .draw-path'), { strokeDashoffset: 0, duration: 0.45, ease: 'power2.out' }, 4.15)
          .to(nav, { yPercent: 0, duration: 0.6, ease: 'back.out(1.8)' }, 3.8);
      };

      document.fonts.ready.then(
        contextSafe(() => {
          // Two frames so Lenis has mounted before we stop it.
          requestAnimationFrame(() => requestAnimationFrame(contextSafe(runIntro)));
        }),
      );

      // ================================================================
      // SCENE 2 — TRAVEL "No shortcuts in the dough" (pinned, scrubbed)
      // ================================================================
      const buildScene2 = () => {
        ScrollTrigger.addEventListener('refreshInit', layout);
        const P = () => L.current;
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: stage,
            start: 'top top',
            end: '+=200%',
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // 0.0 — headline lines exit; note, arrow, sub and buttons fade and drop
        tl.to(q('.hero-line-inner'), { yPercent: -110, stagger: 0.06, duration: 0.3, ease: 'power2.in' }, 0)
          .to(q('.hero-fade'), { autoAlpha: 0, y: 40, duration: 0.3, stagger: 0.03 }, 0);

        // 0.2 — the sage panel with its cookie-bite edge slides up over the stage
        tl.to(q('.s2-panel'), { yPercent: 0, duration: 0.7, ease: 'power2.out' }, 0.2)
          .to(q('.stage > .frame'), { '--panel-bg': '#DCE6CF', duration: 0.3 }, 0.6);

        // 0.3 — the cookie rolls from the hero station to the centre station
        tl.fromTo(
          cookie,
          { x: () => P().hero.x, y: () => P().hero.y, scale: 1, rotate: 0 },
          {
            x: () => P().centre.x,
            y: () => P().centre.y,
            scale: () => P().centre.scale,
            rotate: 200,
            duration: 0.9,
            ease: 'power1.inOut',
            immediateRender: false,
          },
          0.3,
        );

        // 0.8 — the headline enters word by word
        tl.fromTo(
          q('.s2-word'),
          { yPercent: 80, autoAlpha: 0, filter: 'blur(8px)' },
          { yPercent: 0, autoAlpha: 1, filter: 'blur(0px)', stagger: 0.1, duration: 0.4, immediateRender: false },
          0.8,
        );

        // 1.0–1.6 — four badge stickers drop into orbit (NW, NE, SW, SE)
        badgeEls.forEach((badge, i) => {
          tl.fromTo(
            badge,
            { x: () => P().slots[i].x, y: () => P().slots[i].y - P().H, rotate: 0, autoAlpha: 1 },
            { y: () => P().slots[i].y, rotate: BADGE_TILTS[i], duration: 0.45, ease: 'bounce.out', immediateRender: false },
            1.0 + i * 0.15,
          );
        });

        // 1.6 — gifting line fades up, then a short hold
        tl.fromTo(q('.s2-gift'), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.3, immediateRender: false }, 1.6);
        tl.to({}, { duration: 0.5 });
      };

      const unqueue = whenIntroDone(contextSafe(buildScene2));
      return () => {
        unqueue();
        ScrollTrigger.removeEventListener('refreshInit', layout);
      };
    },
    { scope },
  );

  return (
    <section className="stage" ref={scope} aria-label="The Good Bite">
      <Frame />
      <VegMark className="stage-veg" />

      {/* ---------- Scene 1 copy ---------- */}
      <div className="hero">
        <div className="hero-copy">
          <p className="kicker hero-line">
            <span className="hero-line-inner">{brand.kicker}</span>
          </p>
          <h1 className="hero-title">
            <span className="hero-line">
              <span className="hero-line-inner">Homemade happiness,</span>
            </span>
            <span className="hero-line">
              <span className="hero-line-inner">
                baked{' '}
                <span className="u-wrap">
                  just for you
                  <svg className="hero-underline" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
                    <path className="draw-path" d="M4 16 C60 6 120 20 180 10 S260 8 296 14" />
                  </svg>
                </span>
                .
              </span>
            </span>
          </h1>
          <p className="hero-sub spaced hero-fade">{brand.sub}</p>
          <div className="hero-ctas">
            <a className="btn btn-primary hero-fade hero-btn" href={helloHref} target="_blank" rel="noreferrer">
              <WhatsAppIcon width="20" height="20" />
              Order on WhatsApp
            </a>
            <a
              className="btn btn-ghost hero-fade hero-btn"
              href="#menu"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#menu');
              }}
            >
              See the menu
            </a>
          </div>
        </div>
        <div className="hero-spot">
          {reduced && <CookieArt className="static-cookie" />}
          <div className="hero-note hero-fade" aria-hidden="true">
            <span>{brand.note}</span>
            <svg viewBox="0 0 120 80" className="hero-note-arrow">
              <path className="draw-path" d="M8 10 C40 6 78 18 98 58" />
              <path className="draw-path" d="M86 52 L99 61 L104 46" />
            </svg>
          </div>
        </div>
      </div>

      {/* ---------- Scene 1 birth props (decorative) ---------- */}
      {!reduced && (
        <div className="birth" aria-hidden="true">
          <div className="bowl-wrap">
            <Bowl />
            <div className="ingredients">
              <div className="butter">
                <svg viewBox="0 0 60 40">
                  <path d="M4 16l26-10 26 8v14L30 38 4 30z" fill="#F7E3A1" />
                  <path d="M4 16l26 10 26-12" stroke="#E2C46E" strokeWidth="2" fill="none" />
                  <path d="M30 26v12" stroke="#E2C46E" strokeWidth="2" />
                </svg>
              </div>
              {Array.from({ length: 12 }, (_, i) => (
                <i key={i} className="flour" style={{ left: `${22 + i * 4.6}%`, top: `${20 + (i % 3) * 3.5}%` }} />
              ))}
              {Array.from({ length: 6 }, (_, i) => (
                <i key={i} className="chunk" style={{ left: `${28 + i * 7.4}%`, top: `${17 + (i % 2) * 6}%`, rotate: `${i * 37}deg` }} />
              ))}
            </div>
            <div className="stamp">
              <RubberStamp />
            </div>
          </div>
        </div>
      )}

      {/* ---------- Scene 2 panel ---------- */}
      <div className="s2-panel">
        <BiteDivider color="var(--sage-light)" className="s2-edge" />
        <div className="s2-inner">
          <h2 className="s2-title display">{splitWords(S2_HEADLINE, 's2-word')}</h2>
          <div className="s2-centre">
            <div className="s2-cookie-spot">{reduced && <CookieArt className="static-cookie" rotation={200} />}</div>
            <ul className="s2-slots" aria-label="Our promise">
              {badges.map((b, i) => (
                <li key={b.id} className={`s2-slot s2-slot-${i}`} aria-label={b.lines.join(' ')}>
                  {reduced && <BadgeSticker badge={b} style={{ rotate: `${BADGE_TILTS[i]}deg` }} />}
                </li>
              ))}
            </ul>
          </div>
          <p className="s2-gift">{brand.customisation}</p>
        </div>
      </div>

      {/* ---------- The traveling hero object (GSAP only) ---------- */}
      {!reduced && (
        <>
          <div className="hero-cookie" aria-hidden="true">
            <div className="dough">
              <DoughBall />
            </div>
            <div className="cookie-layer">
              <CookieArt />
            </div>
          </div>
          <div className="s2-badges" aria-hidden="true">
            {badges.map((b) => (
              <BadgeSticker key={b.id} badge={b} className="s2-badge" />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
