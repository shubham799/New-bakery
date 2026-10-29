import { useEffect, useRef } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { MotionConfig } from 'motion/react';
import { gsap, ScrollTrigger } from './lib/gsap';
import { SiteProvider, prefersReducedMotion } from './lib/site';
import { OrderProvider } from './lib/order';
import { watchDocumentHeight } from './lib/dom';
import Nav from './components/Nav';
import Toast from './components/Toast';
import Stage from './sections/Stage';
import PickCookie from './sections/PickCookie';
import Process from './sections/Process';
import FullMenu from './sections/FullMenu';
import ViralShowcase from './sections/ViralShowcase';
import BuildBox from './sections/BuildBox';
import Kitchen from './sections/Kitchen';
import Footer from './sections/Footer';

// Keeps ScrollTrigger in sync with every Lenis scroll.
function LenisScrollSync() {
  useLenis(ScrollTrigger.update);
  return null;
}

function Site() {
  useEffect(() => watchDocumentHeight(), []);
  return (
    <>
      <a className="skip-link" href="#menu">
        Skip to the menu
      </a>
      <Nav />
      <main id="top">
        <Stage />
        <PickCookie />
        <Process />
        <FullMenu />
        <ViralShowcase />
        <BuildBox />
        <Kitchen />
      </main>
      <Footer />
      <Toast />
    </>
  );
}

export default function App() {
  const lenisRef = useRef(null);

  // Drive Lenis from GSAP's ticker so scroll and animations share one clock.
  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const raf = (time) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(raf);
  }, []);

  const site = (
    <SiteProvider lenisRef={lenisRef}>
      <MotionConfig reducedMotion="user">
        <OrderProvider>
          <Site />
        </OrderProvider>
      </MotionConfig>
    </SiteProvider>
  );

  // prefers-reduced-motion: no Lenis, native scrolling.
  if (prefersReducedMotion) return site;

  return (
    <ReactLenis root options={{ autoRaf: false, lerp: 0.09 }} ref={lenisRef}>
      <LenisScrollSync />
      {site}
    </ReactLenis>
  );
}
