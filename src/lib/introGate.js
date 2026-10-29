// ScrollTriggers must only be created after the intro timeline finishes,
// otherwise a refresh can snap elements back mid-intro. Sections queue their
// builders here; the Stage calls completeIntro() from the intro's onComplete.
// Builders run in registration order, which is DOM order, so pins stack correctly.
import { ScrollTrigger } from './gsap';

let done = false;
let queue = [];

export function whenIntroDone(build) {
  if (done) {
    build();
    ScrollTrigger.refresh();
    return () => {};
  }
  queue.push(build);
  return () => {
    queue = queue.filter((fn) => fn !== build);
  };
}

export function completeIntro() {
  if (done) return;
  done = true;
  const builders = queue;
  queue = [];
  builders.forEach((build) => build());
  ScrollTrigger.sort();
  ScrollTrigger.refresh();
}
