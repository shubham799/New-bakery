// SCENE 5 — THE FULL MENU (normal scroll).
// card-outer: GSAP (scrubbed rise per row). card-inner: Motion (layout reshuffle,
// enter/exit, hover).
import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { gsap } from '../lib/gsap';
import { useScene } from '../lib/site';
import { queueRefresh } from '../lib/dom';
import { useOrder } from '../lib/order';
import { allItems, brand, filterOrder, formatPrice, priceLineCount, sectionById } from '../data/content';
import FoodArt from '../components/FoodArt';
import { BiteDivider, Frame, HeartRule, LeafSprig, VegMark } from '../components/Decor';

const GROUP_HEADERS = new Set(['cookies', 'viral']);
const cardSpring = { type: 'spring', stiffness: 300, damping: 24 };

function buildEntries(filter, sorted) {
  const items = filter === 'all' ? allItems : allItems.filter((i) => i.sectionId === filter);
  if (sorted) {
    return [...items]
      .sort((a, b) => a.price - b.price || a.order - b.order)
      .map((item) => ({ type: 'item', key: item.id, item }));
  }
  if (!GROUP_HEADERS.has(filter)) return items.map((item) => ({ type: 'item', key: item.id, item }));
  // COOKIES / VIRAL DESSERTS: subsection title + tagline as group headers.
  return sectionById[filter].groups.flatMap((group) => [
    { type: 'header', key: `h-${group.id}`, group },
    ...items.filter((i) => i.groupId === group.id).map((item) => ({ type: 'item', key: item.id, item })),
  ]);
}

function MenuCard({ item, index }) {
  const { add } = useOrder();
  const tilt = index % 2 === 0 ? -1.5 : 1.5;
  const groupLabel = item.groupTitle?.replace(/:$/, '');
  return (
    <motion.article
      className="card-inner"
      layout
      initial={{ opacity: 0, scale: 0.9, rotate: tilt }}
      animate={{ opacity: 1, scale: 1, rotate: tilt }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      whileHover={{ y: -6, rotate: 0 }}
      transition={cardSpring}
    >
      <div className="card-tile">
        <FoodArt kind={item.art} alt="" />
      </div>
      <div className="card-body">
        {groupLabel && <p className="card-group spaced">{groupLabel}</p>}
        <h3 className="card-name">{item.name}</h3>
        {item.note && <p className="card-note">{item.note}</p>}
        <div className="card-foot">
          <span className="card-price">{formatPrice(item.priceStyle, item.price)}</span>
          <span className="chip">{item.sectionTitle}</span>
        </div>
        <button
          type="button"
          className="btn btn-small"
          onClick={() => add(item.id)}
          aria-label={`Add ${groupLabel && item.groupId === 'bomboloni' ? `${groupLabel} ` : ''}${item.name} to order`}
        >
          Add
        </button>
      </div>
    </motion.article>
  );
}

export default function FullMenu() {
  const scope = useRef(null);
  const [filter, setFilter] = useState('all');
  const [sorted, setSorted] = useState(false);
  const entries = useMemo(() => buildEntries(filter, sorted), [filter, sorted]);
  const active = filter === 'all' ? null : sectionById[filter];
  const first = useRef(true);

  // Layout changes height: let ScrollTrigger re-measure everything below.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    queueRefresh(650);
  }, [filter, sorted]);

  useScene(() => {
    const q = gsap.utils.selector(scope);
    // Scene 5 — every card rises as its row enters (cards in a row share a trigger line)
    q('.card-outer').forEach((outer) => {
      gsap.fromTo(
        outer,
        { y: 60, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          ease: 'none',
          scrollTrigger: { trigger: outer, start: 'top 95%', end: 'top 60%', scrub: 1 },
        },
      );
    });
    // Scene 5 — filter bar drops in
    gsap.fromTo(
      q('.filters'),
      { y: 30, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, ease: 'none', scrollTrigger: { trigger: q('.filters')[0], start: 'top 95%', end: 'top 70%', scrub: 1 } },
    );
  }, scope);

  let itemIndex = 0;

  return (
    <section id="menu" className="section full-menu" ref={scope} aria-labelledby="menu-title">
      <BiteDivider color="var(--cream)" />
      <div className="framed">
        <Frame />
        <VegMark className="corner-veg" />
        <header className="section-head">
          <LeafSprig />
          <div>
            <p className="kicker">THE FULL MENU</p>
            <h2 id="menu-title" className="display">
              {priceLineCount} good bites, all eggless.
            </h2>
          </div>
          <LeafSprig flip />
        </header>

        <div className="filters" role="group" aria-label="Filter the menu">
          <div className="filter-row">
            {['all', ...filterOrder].map((id) => (
              <button
                key={id}
                type="button"
                className={`filter ${filter === id ? 'is-active' : ''}`}
                aria-pressed={filter === id}
                onClick={() => setFilter(id)}
              >
                {id === 'all' ? 'All' : sectionById[id].title}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={`sort-toggle ${sorted ? 'is-active' : ''}`}
            aria-pressed={sorted}
            onClick={() => setSorted((v) => !v)}
          >
            Price: low to high
          </button>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {active && active.taglines.length > 0 && (
            <motion.div
              key={active.id}
              className="section-taglines"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
            >
              {active.taglines.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="menu-grid">
          <AnimatePresence mode="popLayout" initial={false}>
            {entries.map((entry) => {
              if (entry.type === 'header') {
                const g = entry.group;
                return (
                  <div className="card-outer grid-header" key={entry.key}>
                    <motion.div
                      className="group-head"
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                    >
                      <span className="ribbon-title">
                        {g.title} {g.titleNote && <small>{g.titleNote}</small>}
                      </span>
                      {g.tagline && <p>{g.tagline}</p>}
                      {g.fillings && (
                        <p className="fillings">
                          <strong>{g.fillingsLabel}</strong> {g.fillings.join(' • ')}
                        </p>
                      )}
                    </motion.div>
                  </div>
                );
              }
              const index = itemIndex++;
              return (
                <div className="card-outer" key={entry.key}>
                  <MenuCard item={entry.item} index={index} />
                </div>
              );
            })}
          </AnimatePresence>
        </div>
        <HeartRule dotted />
        <p className="menu-foot">{brand.customisation}</p>
      </div>
    </section>
  );
}
