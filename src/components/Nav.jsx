// Site header. The <header> is GSAP-only (it drops in at the end of the
// Scene 1 intro); the mobile sheet is a separate Motion element.
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Logo, VegMark } from './Decor';
import { WhatsAppIcon } from './Icons';
import { useScrollTo } from '../lib/site';
import { useOrder, whatsappHref } from '../lib/order';
import { brand } from '../data/content';

export const navLinks = [
  { label: 'Menu', target: '#menu' },
  { label: 'Cookies', target: '#cookies' },
  { label: 'Viral', target: '#viral' },
  { label: 'Build your box', target: '#build' },
  { label: 'Visit', target: '#visit' },
];

export const helloHref = whatsappHref(`Hello ${brand.name}! I'd like to place a pre-order.`);

export default function Nav() {
  const scrollTo = useScrollTo();
  const { count } = useOrder();
  const [open, setOpen] = useState(false);

  const go = (e, target) => {
    e.preventDefault();
    setOpen(false);
    scrollTo(target);
  };

  return (
    <>
      <header className="site-nav">
        <a href="#top" className="nav-logo" onClick={(e) => go(e, 0)} aria-label="The Good Bite — back to top">
          <Logo size={52} />
        </a>
        <nav aria-label="Primary" className="nav-links">
          {navLinks.map((l) => (
            <a key={l.target} href={l.target} onClick={(e) => go(e, l.target)}>
              {l.label}
              {l.target === '#build' && count > 0 && <span className="nav-count">{count}</span>}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <VegMark />
          <a className="btn btn-primary btn-sm" href={helloHref} target="_blank" rel="noreferrer">
            <WhatsAppIcon width="18" height="18" />
            <span>Order on WhatsApp</span>
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <span className={`burger ${open ? 'is-open' : ''}`} aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            className="mobile-menu"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { type: 'spring', bounce: 0.4, duration: 0.45 } }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.18 } }}
          >
            {navLinks.map((l) => (
              <a key={l.target} href={l.target} onClick={(e) => go(e, l.target)}>
                {l.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
