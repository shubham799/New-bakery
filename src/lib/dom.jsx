import { Fragment } from 'react';
import { ScrollTrigger } from './gsap';

// Untransformed position of `el` inside `ancestor` (sums offsetLeft/Top up the
// offsetParent chain). Never use getBoundingClientRect on transformed elements.
export function offsetWithin(el, ancestor) {
  let x = 0;
  let y = 0;
  let node = el;
  while (node && node !== ancestor) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent;
  }
  return { x, y };
}

// Centre of `el` inside `ancestor`, untransformed.
export function centreWithin(el, ancestor) {
  const { x, y } = offsetWithin(el, ancestor);
  return { x: x + el.offsetWidth / 2, y: y + el.offsetHeight / 2 };
}

// Debounced ScrollTrigger.refresh for when content height changes
// (filters, accordions, added items).
let refreshTimer;
export function queueRefresh(delay = 450) {
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => ScrollTrigger.refresh(), delay);
}

// Watch the document height and refresh triggers when it changes on its own.
export function watchDocumentHeight() {
  let last = document.documentElement.scrollHeight;
  const onRefresh = () => {
    last = document.documentElement.scrollHeight;
  };
  ScrollTrigger.addEventListener('refresh', onRefresh);
  const ro = new ResizeObserver(() => {
    const h = document.documentElement.scrollHeight;
    if (Math.abs(h - last) > 2) queueRefresh();
  });
  ro.observe(document.body);
  return () => {
    ro.disconnect();
    ScrollTrigger.removeEventListener('refresh', onRefresh);
  };
}

// Wrap each word of a string in spans for word-by-word reveals.
export function splitWords(text, className = 'word') {
  return text.split(' ').map((word, i, arr) => (
    <Fragment key={i}>
      <span className={`${className}-wrap`}>
        <span className={className}>{word}</span>
      </span>
      {i < arr.length - 1 ? ' ' : ''}
    </Fragment>
  ));
}

export function tomorrowISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
