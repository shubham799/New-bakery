import { createContext, useCallback, useContext, useRef } from 'react';
import { useGSAP } from './gsap';
import { whenIntroDone } from './introGate';

export const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const SiteContext = createContext(null);

export function SiteProvider({ lenisRef, children }) {
  const value = useRef({ lenisRef, reduced: prefersReducedMotion }).current;
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  return useContext(SiteContext);
}

// Anchor navigation: Lenis when smooth scrolling is on, native otherwise.
export function useScrollTo() {
  const { lenisRef, reduced } = useSite();
  return useCallback(
    (target) => {
      const lenis = lenisRef.current?.lenis;
      if (lenis && !reduced) {
        lenis.scrollTo(target, { duration: 1.6 });
      } else if (typeof target === 'number') {
        window.scrollTo(0, target);
      } else {
        const el = typeof target === 'string' ? document.querySelector(target) : target;
        el?.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    },
    [lenisRef, reduced],
  );
}

// Scroll-scene hook: queues `build` until the intro has finished, runs it
// inside the component's gsap.context (so everything reverts on unmount),
// and skips it entirely for prefers-reduced-motion.
export function useScene(build, scope) {
  const { reduced } = useSite();
  useGSAP(
    (context, contextSafe) => {
      if (reduced) return undefined;
      return whenIntroDone(contextSafe(build));
    },
    { scope },
  );
}
