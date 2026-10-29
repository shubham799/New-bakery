// SCENE 7 — BUILD YOUR BOX (normal scroll).
// picker-row-outer: GSAP (scrubbed rise). picker-row-inner: Motion (qty bump, hover).
// box-col (outer): GSAP slide-in from x 80; CSS position:sticky (NOT a GSAP pin).
// Tiles inside the box: Motion (AnimatePresence, spring drop, layout reflow).
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { gsap } from '../lib/gsap';
import { useScene } from '../lib/site';
import { splitWords, tomorrowISO } from '../lib/dom';
import { buildOrderMessage, lineLabel, useOrder, whatsappHref } from '../lib/order';
import { brand, formatPrice, formatTotal, itemById, menu, telHref } from '../data/content';
import FoodArt from '../components/FoodArt';
import { BiteDivider, Frame, LeafSprig, VegMark } from '../components/Decor';
import { BagIcon, ChevronIcon, PhoneIcon, ScooterIcon, WhatsAppIcon } from '../components/Icons';

function Qty({ value, onMinus, onPlus, label, disabled }) {
  return (
    <div className="qty" role="group" aria-label={`Quantity for ${label}`}>
      <button type="button" onClick={onMinus} disabled={disabled || value === 0} aria-label={`Remove one ${label}`}>
        −
      </button>
      <motion.span
        key={value}
        className="qty-value"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 12 }}
        aria-live="polite"
      >
        {value}
      </motion.span>
      <button type="button" onClick={onPlus} disabled={disabled} aria-label={`Add one ${label}`}>
        +
      </button>
    </div>
  );
}

function PickerRow({ item, priceStyle }) {
  const { qtyFor, changeQty } = useOrder();
  const qty = qtyFor(item.id);
  return (
    <li className="picker-row-outer">
      <motion.div className={`picker-row-inner ${qty ? 'has-qty' : ''}`} whileHover={{ x: 4 }}>
        <span className="pr-name">
          {item.name}
          {item.note && <small> {item.note}</small>}
        </span>
        <span className="pr-price">{formatPrice(priceStyle, item.price)}</span>
        <Qty
          value={qty}
          label={item.name}
          onMinus={() => changeQty(item.id, -1)}
          onPlus={() => changeQty(item.id, 1)}
        />
      </motion.div>
    </li>
  );
}

function BomboloniPicker({ group, priceStyle }) {
  const { qtyFor, changeQty } = useOrder();
  const [pack, setPack] = useState(null);
  const [filling, setFilling] = useState(null);
  const ready = pack && filling;
  const qty = ready ? qtyFor(pack, filling) : 0;
  return (
    <li className="picker-row-outer">
      <motion.div className="picker-row-inner bombo" whileHover={{ x: 4 }}>
        <p className="bombo-tag">{group.tagline}</p>
        <div className="bombo-choices" role="group" aria-label="Bomboloni pack (required)">
          {group.items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`chip-btn ${pack === item.id ? 'is-selected' : ''}`}
              aria-pressed={pack === item.id}
              onClick={() => setPack(item.id)}
            >
              {item.name} · {formatPrice(priceStyle, item.price)}
            </button>
          ))}
        </div>
        <div className="bombo-choices" role="group" aria-label="Bomboloni filling (required)">
          <span className="bombo-label">{group.fillingsLabel}</span>
          {group.fillings.map((f) => (
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
        <div className="bombo-qty">
          <span className="bombo-hint">{ready ? `${itemById[pack].name} — ${filling}` : 'Choose a pack and a filling'}</span>
          <Qty
            value={qty}
            label="Bomboloni"
            disabled={!ready}
            onMinus={() => changeQty(pack, -1, filling)}
            onPlus={() => changeQty(pack, 1, filling)}
          />
        </div>
      </motion.div>
    </li>
  );
}

function Accordion({ section, open, onToggle }) {
  const { lines } = useOrder();
  const inSection = lines.filter((l) => itemById[l.itemId].sectionId === section.id).reduce((s, l) => s + l.qty, 0);
  const panelId = `acc-${section.id}`;
  return (
    <div className={`accordion ${open ? 'is-open' : ''}`}>
      <h3>
        <button type="button" className="acc-head" aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
          <span className="acc-title">{section.title}</span>
          {inSection > 0 && <span className="acc-count">{inSection}</span>}
          <ChevronIcon className="acc-chev" width="20" height="20" />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            className="acc-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
          >
            {section.taglines.map((t) => (
              <p key={t} className="acc-tagline">
                {t}
              </p>
            ))}
            {section.groups.map((group) => (
              <div key={group.id} className="acc-group">
                {group.title && (
                  <p className="acc-group-title">
                    <span className="spaced">{group.title}</span> {group.titleNote}
                    {group.tagline && !group.requiresFilling && <span className="acc-group-tag">{group.tagline}</span>}
                  </p>
                )}
                <ul className="picker-list">
                  {group.requiresFilling ? (
                    <BomboloniPicker group={group} priceStyle={section.priceStyle} />
                  ) : (
                    group.items.map((item) => <PickerRow key={item.id} item={item} priceStyle={section.priceStyle} />)
                  )}
                </ul>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function BuildBox() {
  const scope = useRef(null);
  const totalRef = useRef(null);
  const totalObj = useRef({ v: 0 });
  const { lines, setQty, setFilling, subtotal, count, missingFilling } = useOrder();
  const [openIds, setOpenIds] = useState(() => new Set([menu[0].id]));
  const [fulfilment, setFulfilment] = useState('pickup');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const minDate = tomorrowISO();

  // Live subtotal: GSAP counter on a plain object, "₹" + en-IN.
  useEffect(() => {
    const tween = gsap.to(totalObj.current, {
      v: subtotal,
      duration: 0.6,
      ease: 'power2.out',
      onUpdate: () => {
        if (totalRef.current) totalRef.current.textContent = formatTotal(totalObj.current.v);
      },
    });
    return () => tween.kill();
  }, [subtotal]);

  useScene(() => {
    const q = gsap.utils.selector(scope);
    // Scene 7 — headline words
    gsap.fromTo(
      q('.bb-word'),
      { yPercent: 80, autoAlpha: 0, filter: 'blur(8px)' },
      {
        yPercent: 0,
        autoAlpha: 1,
        filter: 'blur(0px)',
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: q('.bb-title')[0], start: 'top 95%', end: 'top 55%', scrub: 1 },
      },
    );
    // Scene 7 — picker rows rise (outer only)
    q('.picker-row-outer').forEach((row) => {
      gsap.fromTo(
        row,
        { y: 40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, ease: 'none', scrollTrigger: { trigger: row, start: 'top 95%', end: 'top 70%', scrub: 1 } },
      );
    });
    // Scene 7 — box panel slides in from x 80 (outer only)
    gsap.fromTo(
      q('.box-col'),
      { x: 80, autoAlpha: 0 },
      { x: 0, autoAlpha: 1, ease: 'none', scrollTrigger: { trigger: q('.build-grid')[0], start: 'top 95%', end: 'top 50%', scrub: 1 } },
    );
  }, scope);

  const toggle = (id) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const canSend = lines.length > 0 && !missingFilling;
  const message = buildOrderMessage({ lines, subtotal, fulfilment, date, note });

  return (
    <section id="build" className="section build" ref={scope} aria-labelledby="bb-title">
      <BiteDivider color="var(--cream)" />
      <div className="framed">
        <Frame />
        <VegMark className="corner-veg" />
        <header className="section-head">
          <LeafSprig />
          <div>
            <h2 id="bb-title" className="bb-title display">
              {splitWords('Build your box.', 'bb-word')}
            </h2>
            <p className="section-sub">{brand.customisation}</p>
          </div>
          <LeafSprig flip />
        </header>

        <div className="build-grid">
          <div className="picker">
            {menu.map((section) => (
              <Accordion key={section.id} section={section} open={openIds.has(section.id)} onToggle={() => toggle(section.id)} />
            ))}
          </div>

          <aside className="box-col" aria-label="Your box" data-lenis-prevent>
            <div className="box-panel-inner">
              <div className="kraft" aria-hidden={lines.length === 0}>
                <div className="kraft-inner">
                  <AnimatePresence mode="popLayout">
                    {lines.length === 0 && (
                      <motion.p key="empty" className="kraft-empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        Your box is empty — add something sweet.
                      </motion.p>
                    )}
                    {lines.map((line) => {
                      const item = itemById[line.itemId];
                      return (
                        <motion.div
                          key={line.key}
                          className="tile"
                          layout
                          initial={{ y: -40, opacity: 0, scale: 0.8, rotate: -6 }}
                          animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
                          exit={{ scale: 0, opacity: 0, y: -24, transition: { duration: 0.22 } }}
                          transition={{ type: 'spring', stiffness: 420, damping: 16 }}
                          title={lineLabel(line)}
                        >
                          <FoodArt kind={item.art} />
                          <span className="tile-qty">×{line.qty}</span>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>

              <ul className="lines">
                <AnimatePresence initial={false}>
                  {lines.map((line) => {
                    const item = itemById[line.itemId];
                    const label = lineLabel(line);
                    return (
                      <motion.li
                        key={line.key}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="line"
                      >
                        <div className="line-main">
                          <span className="line-name">{label}</span>
                          <span className="line-each">
                            {line.qty} × {formatPrice(item.priceStyle, item.price)}
                          </span>
                        </div>
                        <Qty
                          value={line.qty}
                          label={label}
                          onMinus={() => setQty(line.key, line.qty - 1)}
                          onPlus={() => setQty(line.key, line.qty + 1)}
                        />
                        <span className="line-total">{formatTotal(item.price * line.qty)}</span>
                        {item.requiresFilling && !line.filling && (
                          <div className="line-fix" role="group" aria-label={`Choose a filling for ${label}`}>
                            <span>Choose a filling:</span>
                            {item.fillings.map((f) => (
                              <button key={f} type="button" className="chip-btn" onClick={() => setFilling(line.key, f)}>
                                {f}
                              </button>
                            ))}
                          </div>
                        )}
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>

              <p className="subtotal">
                <span>{fulfilment === 'delivery' ? 'Subtotal (delivery charges extra)' : 'Subtotal'}</span>
                <strong ref={totalRef} aria-hidden="true">
                  {formatTotal(0)}
                </strong>
                <span className="sr-only" aria-live="polite">
                  {formatTotal(subtotal)}, {count} items
                </span>
              </p>

              <div className="fulfil" role="group" aria-label="Pick-up or delivery">
                <button
                  type="button"
                  className={`fulfil-btn ${fulfilment === 'pickup' ? 'is-active' : ''}`}
                  aria-pressed={fulfilment === 'pickup'}
                  onClick={() => setFulfilment('pickup')}
                >
                  <BagIcon width="18" height="18" /> SELF PICK-UP
                </button>
                <button
                  type="button"
                  className={`fulfil-btn ${fulfilment === 'delivery' ? 'is-active' : ''}`}
                  aria-pressed={fulfilment === 'delivery'}
                  onClick={() => setFulfilment('delivery')}
                >
                  <ScooterIcon width="26" height="18" /> DELIVERY
                </button>
              </div>
              <div className="fulfil-info" aria-live="polite">
                {fulfilment === 'pickup' ? (
                  <>
                    <p>
                      <strong>{brand.location}</strong> {brand.locationNote}
                    </p>
                    <p>{brand.pickup}</p>
                  </>
                ) : (
                  <p>
                    <strong>{brand.delivery}</strong> {brand.deliveryNote}
                  </p>
                )}
              </div>

              <label className="field">
                <span className="field-label">Date</span>
                <input type="date" min={minDate} value={date} onChange={(e) => setDate(e.target.value)} aria-describedby="date-help" />
                <span id="date-help" className="field-help">
                  {brand.advance}
                  <br />
                  {brand.timingsTitle} {brand.timings}
                </span>
              </label>

              <label className="field">
                <span className="field-label">Gift / customisation note (optional)</span>
                <textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} />
              </label>

              <div className="send">
                {canSend ? (
                  <motion.a
                    className="btn btn-primary btn-block"
                    href={whatsappHref(message)}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <WhatsAppIcon width="20" height="20" /> Send order on WhatsApp
                  </motion.a>
                ) : (
                  <button type="button" className="btn btn-primary btn-block" disabled>
                    <WhatsAppIcon width="20" height="20" /> Send order on WhatsApp
                  </button>
                )}
                {!canSend && (
                  <p className="send-hint">
                    {lines.length === 0 ? 'Add something to your box first.' : 'Choose a filling for your Bomboloni.'}
                  </p>
                )}
                <a className="btn btn-ghost btn-block" href={telHref}>
                  <PhoneIcon width="18" height="18" /> Call {brand.phone}
                </a>
                <p className="send-hint">No online payment.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
