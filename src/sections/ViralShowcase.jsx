// SCENE 6 — VIRAL DESSERTS (pinned horizontal).
// The track tween uses ease:'none'. Every per-panel effect uses
// containerAnimation: track, start 'left 60%', end 'right 40%'.
// Add buttons carry no GSAP transforms (Motion hover only).
import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { useScene } from '../lib/site';
import { useOrder } from '../lib/order';
import { brand, formatPrice, sectionById, viralPanelTints } from '../data/content';
import { CookieFace } from '../components/CookieArt';
import { LeafSprig, VegMark } from '../components/Decor';

const viral = sectionById.viral;
const [tinGroup, londonGroup, cakeGroup, bomboGroup] = viral.groups;
const rupee = (v) => formatPrice('rupee', v);

// Price that counts up from 0 (GSAP writes the text; screen readers get the real value).
function Count({ value }) {
  return (
    <span className="price">
      <span className="count" data-value={value} aria-hidden="true">
        {rupee(value)}
      </span>
      <span className="sr-only">{rupee(value)}</span>
    </span>
  );
}

function AddButton({ onClick, disabled, label = 'Add to order' }) {
  return (
    <motion.button
      type="button"
      className="btn btn-primary"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </motion.button>
  );
}

function PanelHead({ title, note }) {
  return (
    <h3 className="ribbon-title">
      {title} {note && <small>{note}</small>}
    </h3>
  );
}

// ---------- P1 COOKIE TIN ----------
function TinPanel() {
  const { add } = useOrder();
  const [pick, setPick] = useState(tinGroup.items[0].id);
  return (
    <article className="vpanel" data-panel="tin" aria-labelledby="vp-tin">
      <div className="vp-visual" aria-hidden="true">
        <div className="tin">
          <svg viewBox="0 0 240 200" className="tin-back">
            <ellipse cx="120" cy="70" rx="100" ry="26" fill="#163822" />
          </svg>
          <div className="tin-cookies">
            {[0, 1, 2, 3].map((i) => (
              <svg key={i} viewBox="0 0 60 60" className="tin-cookie" style={{ '--i': i }}>
                <CookieFace cx={30} cy={30} r={27} seed={i + 3} count={6} dough={i === 2 ? '#6B4430' : '#D4943F'} chunk={i === 2 ? '#2A170D' : '#4B2E1F'} />
              </svg>
            ))}
          </div>
          <svg viewBox="0 0 240 200" className="tin-front">
            <path d="M20 70v90c0 14 45 26 100 26s100-12 100-26V70c0 14-45 26-100 26S20 84 20 70z" fill="#1F4A2C" />
            <path d="M20 112c0 14 45 26 100 26s100-12 100-26v14c0 14-45 26-100 26S20 140 20 126z" fill="#D4943F" />
            <text x="120" y="176" textAnchor="middle" className="tin-label">
              THE GOOD BITE
            </text>
          </svg>
          <svg viewBox="0 0 240 80" className="tin-lid">
            <ellipse cx="120" cy="40" rx="106" ry="28" fill="#2C5E3B" />
            <path d="M14 40v10c0 15 47 28 106 28s106-13 106-28V40c0 15-47 28-106 28S14 55 14 40z" fill="#163822" />
            <ellipse cx="120" cy="38" rx="60" ry="14" fill="none" stroke="#D4943F" strokeWidth="3" />
          </svg>
        </div>
      </div>
      <div className="vp-copy">
        <span id="vp-tin">
          <PanelHead title={tinGroup.title} note={tinGroup.titleNote} />
        </span>
        <ul className="vp-list" role="group" aria-label="Cookie tin flavour">
          {tinGroup.items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`vp-choice ${pick === item.id ? 'is-selected' : ''}`}
                aria-pressed={pick === item.id}
                onClick={() => setPick(item.id)}
              >
                <span className="leader-name">{item.name}</span>
                <span className="leader" aria-hidden="true" />
                <Count value={item.price} />
              </button>
            </li>
          ))}
        </ul>
        <AddButton onClick={() => add(pick)} />
      </div>
    </article>
  );
}

// ---------- P2 / P3 LONDON'S VIRAL DESSERTS ----------
function Tub({ layers, children }) {
  return (
    <div className="tub">
      <div className="tub-fill">
        {layers.map((l) => (
          <div key={l.name} className="tub-layer" style={{ '--h': l.h, background: l.color }} />
        ))}
        {children}
      </div>
      <svg viewBox="0 0 200 220" className="tub-glass">
        <path d="M14 20h172l-14 186c-1 8-6 12-14 12H42c-8 0-13-4-14-12z" fill="#fff" fillOpacity=".18" stroke="#C9B98F" strokeWidth="3" />
        <path d="M30 40l8 150" stroke="#fff" strokeOpacity=".6" strokeWidth="5" strokeLinecap="round" />
        <rect x="8" y="10" width="184" height="14" rx="6" fill="#FFFDF8" stroke="#C9B98F" strokeWidth="2" />
      </svg>
    </div>
  );
}

function LondonPanel({ item, kind }) {
  const { add } = useOrder();
  const caramel = kind === 'caramel';
  return (
    <article className="vpanel" data-panel={kind} aria-labelledby={`vp-${kind}`}>
      <div className="vp-visual" aria-hidden="true">
        {caramel ? (
          <Tub
            layers={[
              { name: 'sponge', h: '38%', color: 'linear-gradient(#7A4A2A, #5C3620)' },
              { name: 'caramel', h: '22%', color: 'linear-gradient(#E0A24E, #C9822F)' },
              { name: 'chocolate', h: '24%', color: 'linear-gradient(#4B2E1F, #3A2216)' },
            ]}
          >
            <svg viewBox="0 0 200 60" className="drizzle">
              <path className="draw-path" d="M20 30 C40 10 50 50 70 28 S100 8 120 30 S160 50 180 24" stroke="#E0A24E" strokeWidth="7" fill="none" strokeLinecap="round" />
            </svg>
          </Tub>
        ) : (
          <Tub
            layers={[
              { name: 'coffee-sponge', h: '34%', color: 'linear-gradient(#8A5A3B, #6B4430)' },
              { name: 'cream', h: '40%', color: 'linear-gradient(#FBF3E4, #EFE0C4)' },
            ]}
          >
            <div className="crumbles">
              {Array.from({ length: 7 }, (_, i) => (
                <i key={i} className="crumble" style={{ '--i': i }} />
              ))}
            </div>
          </Tub>
        )}
      </div>
      <div className="vp-copy">
        <span id={`vp-${kind}`}>
          <PanelHead title={londonGroup.title} />
        </span>
        <p className="vp-item">
          <span className="leader-name">
            {item.name} {item.note && <small>{item.note}</small>}
          </span>
          <span className="leader" aria-hidden="true" />
          <Count value={item.price} />
        </p>
        <AddButton onClick={() => add(item.id)} />
      </div>
    </article>
  );
}

// ---------- P4 BUTTER CHOCOLATE CHIP CAKE ----------
function CakePanel() {
  const { add } = useOrder();
  const item = cakeGroup.items[0];
  return (
    <article className="vpanel" data-panel="cake" aria-labelledby="vp-cake">
      <div className="vp-visual" aria-hidden="true">
        <div className="loaf">
          <svg viewBox="0 0 300 160" className="loaf-body">
            <path d="M10 70c0-30 30-44 70-44h150v120H10z" fill="#C98A45" />
            <path d="M10 70c0-30 30-44 70-44h150c-30 18-160 30-220 44z" fill="#9A6424" />
            {[40, 90, 140, 190].map((x, i) => (
              <circle key={x} cx={x} cy={100 + (i % 2) * 18} r="6" fill="#3A2216" />
            ))}
          </svg>
          <svg viewBox="0 0 70 160" className="loaf-slice">
            <rect x="4" y="26" width="62" height="120" rx="4" fill="#E7B66E" />
            <path d="M4 40c0-10 6-14 12-14h50v14z" fill="#9A6424" />
            {[[20, 70], [44, 90], [26, 116], [50, 128], [36, 54]].map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill="#3A2216" />
            ))}
          </svg>
        </div>
      </div>
      <div className="vp-copy">
        <span id="vp-cake">
          <PanelHead title={cakeGroup.title} />
        </span>
        <p className="vp-item">
          <span className="leader-name">{item.note}</span>
          <span className="leader" aria-hidden="true" />
          <Count value={item.price} />
        </p>
        <AddButton onClick={() => add(item.id)} />
      </div>
    </article>
  );
}

// ---------- P5 BOMBOLONI ----------
const fillingColours = ['#F6E3A6', '#5A3420', '#B8875A']; // DERIVED: custard, ganache, coffee

function BomboloniPanel() {
  const { add } = useOrder();
  const [pack, setPack] = useState(null);
  const [filling, setFilling] = useState(null);
  return (
    <article className="vpanel" data-panel="bomboloni" aria-labelledby="vp-bombo">
      <div className="vp-visual" aria-hidden="true">
        <div className="donuts">
          {bomboGroup.fillings.map((f, i) => (
            <figure className="donut" key={f}>
              <div className="donut-ball">
                <span className="donut-fill" style={{ background: fillingColours[i] }} />
                <span className="donut-sugar" />
              </div>
              <figcaption>{f}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="vp-copy">
        <span id="vp-bombo">
          <PanelHead title={bomboGroup.title} />
        </span>
        <p className="vp-tagline">{bomboGroup.tagline}</p>
        <div className="vp-options" role="group" aria-label="Pack">
          {bomboGroup.items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`vp-choice ${pack === item.id ? 'is-selected' : ''}`}
              aria-pressed={pack === item.id}
              onClick={() => setPack(item.id)}
            >
              <span className="leader-name">{item.name}</span>
              <span className="leader" aria-hidden="true" />
              <Count value={item.price} />
            </button>
          ))}
        </div>
        <p className="vp-label">
          <strong>{bomboGroup.fillingsLabel}</strong>
        </p>
        <div className="chip-row" role="group" aria-label="Filling">
          {bomboGroup.fillings.map((f) => (
            <button
              key={f}
              type="button"
              className={`chip-btn ${filling === f ? 'is-selected' : ''}`}
              aria-pressed={filling === f}
              onClick={() => setFilling(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <AddButton
          disabled={!pack || !filling}
          label={!pack || !filling ? 'Choose a pack & filling' : 'Add to order'}
          onClick={() => add(pack, { filling })}
        />
      </div>
    </article>
  );
}

export default function ViralShowcase() {
  const scope = useRef(null);

  useScene(() => {
    const section = scope.current;
    const q = gsap.utils.selector(section);
    const trackEl = q('.viral-track')[0];
    const panels = q('.vpanel:not(.vpanel-intro)');

    q('.draw-path').forEach((p) => {
      const len = p.getTotalLength();
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
    });
    q('.count').forEach((el) => {
      el.textContent = rupee(0);
    });

    // Scene 6 — the horizontal track (ease:'none' is required for containerAnimation)
    const track = gsap.to(trackEl, {
      x: () => -(trackEl.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        end: () => '+=' + (trackEl.scrollWidth - window.innerWidth),
        invalidateOnRefresh: true,
      },
    });

    const panelTl = (panel) =>
      gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: panel, containerAnimation: track, start: 'left 60%', end: 'right 40%', scrub: 1 },
      });

    const counters = (panel, tl, at) => {
      panel.querySelectorAll('.count').forEach((el, i) => {
        const obj = { v: 0 };
        const value = Number(el.dataset.value);
        tl.to(obj, { v: value, duration: 0.5, onUpdate: () => (el.textContent = rupee(Math.round(obj.v))) }, at + i * 0.08);
      });
    };

    // Scene 6 — background colour per panel (tweens a CSS variable on the section)
    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        containerAnimation: track,
        start: 'left 60%',
        end: 'right 40%',
        onToggle: (self) => {
          if (self.isActive) gsap.to(section, { '--viral-bg': viralPanelTints[i], duration: 0.6, overwrite: 'auto' });
        },
        onLeaveBack: (self) => {
          if (i === 0) gsap.to(section, { '--viral-bg': '#F8F4EC', duration: 0.6, overwrite: 'auto' });
        },
      });
    });

    // P1 — tin lid twists off, four cookies rise, prices count up
    {
      const p = panels[0];
      const tl = panelTl(p);
      tl.fromTo(p.querySelector('.tin-lid'), { rotate: 0, y: 0, transformOrigin: '4% 90%' }, { rotate: -25, y: -80, duration: 0.4, ease: 'power2.out' }, 0)
        .fromTo(p.querySelectorAll('.tin-cookie'), { yPercent: 120 }, { yPercent: 0, duration: 0.4, ease: 'back.out(2)', stagger: 0.1 }, 0.3);
      counters(p, tl, 0.2);
      tl.to({}, { duration: 0.9 });
    }

    // P2 — the tub fills in layers (sponge, caramel, chocolate), then the drizzle
    {
      const p = panels[1];
      const tl = panelTl(p);
      p.querySelectorAll('.tub-layer').forEach((layer, i) => {
        tl.fromTo(layer, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.25 }, i * 0.25);
      });
      tl.to(p.querySelector('.drizzle .draw-path'), { strokeDashoffset: 0, duration: 0.3 }, 0.78);
      counters(p, tl, 0.2);
      tl.to({}, { duration: 1 });
    }

    // P3 — cream layer, then crumble pieces bounce in
    {
      const p = panels[2];
      const tl = panelTl(p);
      p.querySelectorAll('.tub-layer').forEach((layer, i) => {
        tl.fromTo(layer, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.3 }, i * 0.3);
      });
      tl.fromTo(p.querySelectorAll('.crumble'), { y: -220, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.35, ease: 'bounce.out', stagger: 0.05 }, 0.6);
      counters(p, tl, 0.2);
      tl.to({}, { duration: 1 });
    }

    // P4 — the loaf slides in from the right, one slice separates and tilts
    {
      const p = panels[3];
      const tl = panelTl(p);
      tl.fromTo(p.querySelector('.loaf'), { x: 320, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.4, ease: 'power3.out' }, 0)
        .fromTo(p.querySelector('.loaf-slice'), { x: 0, rotate: 0 }, { x: 34, rotate: 8, transformOrigin: '50% 100%', duration: 0.3, ease: 'back.out(2)' }, 0.45);
      counters(p, tl, 0.2);
      tl.to({}, { duration: 1 });
    }

    // P5 — three bomboloni drop in and fill with their creams
    {
      const p = panels[4];
      const tl = panelTl(p);
      tl.fromTo(p.querySelectorAll('.donut'), { y: -260, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4, ease: 'bounce.out', stagger: 0.12 }, 0);
      p.querySelectorAll('.donut-fill').forEach((fill, i) => {
        tl.fromTo(fill, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.25 }, 0.5 + i * 0.12);
      });
      counters(p, tl, 0.2);
      tl.to({}, { duration: 1 });
    }
  }, scope);

  return (
    <section id="viral" className="viral" ref={scope} aria-labelledby="viral-title">
      <VegMark className="corner-veg" />
      <div className="viral-track">
        <div className="vpanel vpanel-intro">
          <div className="viral-title-row">
            <LeafSprig />
            <h2 id="viral-title" className="display viral-title">
              {viral.title}
            </h2>
            <LeafSprig flip />
          </div>
          <p className="viral-sub">Straight from our VIRAL DESSERTS menu.</p>
          <p className="viral-hint" aria-hidden="true">
            scroll →
          </p>
        </div>
        <TinPanel />
        <LondonPanel item={londonGroup.items[0]} kind="caramel" />
        <LondonPanel item={londonGroup.items[1]} kind="espresso" />
        <CakePanel />
        <BomboloniPanel />
        {/* Outro: gives the last panel room to reach 'right 40%' so its effects complete */}
        <div className="vpanel-outro" aria-hidden="true">
          <p className="script">{brand.customisation}</p>
          <LeafSprig />
        </div>
      </div>
    </section>
  );
}
