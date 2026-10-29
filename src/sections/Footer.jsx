// SCENE 9 — FOOTER (--forest-deep). The header switches to light-on-dark via
// toggleClass on body; the final cookie loses a second bite as you reach the end.
import { useRef } from 'react';
import { gsap } from '../lib/gsap';
import { useScene } from '../lib/site';
import { brand, telHref } from '../data/content';
import CookieArt from '../components/CookieArt';
import { BiteDivider, Logo, VegMark } from '../components/Decor';
import { InstagramIcon, WhatsAppIcon } from '../components/Icons';
import { helloHref } from '../components/Nav';

export default function Footer() {
  const scope = useRef(null);

  useScene(() => {
    const footer = scope.current;
    const q = gsap.utils.selector(footer);
    // Scene 9 — light-on-dark header while over the footer
    gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: 'top 64px',
        end: 'bottom top',
        toggleClass: { targets: document.body, className: 'nav-dark' },
      },
    });
    // Scene 9 — the last bite (mask scales in, scrubbed to the very end)
    gsap.fromTo(
      q('.echo .bite-2'),
      { scale: 0, transformOrigin: '50% 50%' },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: q('.echo')[0], start: 'top 80%', end: 'bottom bottom', scrub: 1 },
      },
    );
  }, scope);

  return (
    <footer className="footer" ref={scope}>
      <BiteDivider color="var(--forest-deep)" />
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">
            <Logo size={128} />
          </span>
          <p className="spaced">{brand.tagline}</p>
          <VegMark />
        </div>

        <div className="footer-cta">
          <p className="script">{brand.placeOrder}</p>
          <a className="btn btn-cream btn-xl" href={helloHref} target="_blank" rel="noreferrer">
            <WhatsAppIcon width="26" height="26" />
            {brand.contactLine}
          </a>
          <a className="footer-call" href={telHref}>
            or call +91 {brand.phone}
          </a>
        </div>

        <ul className="footer-info">
          <li>
            <strong>{brand.preOrderTitle}</strong>
            <span>{brand.advance}</span>
          </li>
          <li>
            <strong>{brand.timingsTitle}</strong>
            <span>{brand.timings}</span>
          </li>
          <li>
            <strong>{brand.orderingTitle}</strong>
            <span>{brand.ordering}</span>
          </li>
          <li>
            <strong>{brand.location}</strong>
            <span>{brand.locationNote}</span>
          </li>
          <li>
            <strong>Instagram</strong>
            <a href={brand.instagramUrl} target="_blank" rel="noreferrer">
              <InstagramIcon width="16" height="16" /> {brand.instagram}
            </a>
          </li>
        </ul>
      </div>

      <div className="echo">
        <div className="echo-cookie" aria-hidden="true">
          <CookieArt bites={2} />
        </div>
        <p className="copyright">
          © {new Date().getFullYear()} {brand.name}.
        </p>
      </div>
    </footer>
  );
}
