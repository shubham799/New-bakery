// One place to register GSAP plugins so every module shares the same instance.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);
ScrollTrigger.config({ ignoreMobileResize: true });

// Dev only: lets you slow animations from the console, e.g. gsap.globalTimeline.timeScale(0.2)
if (import.meta.env.DEV) window.gsap = gsap;

export { gsap, ScrollTrigger, useGSAP };
