import { createRoot } from 'react-dom/client';
import 'lenis/dist/lenis.css';
import './styles/base.css';
import './styles/sections.css';
import App from './App';
import { prefersReducedMotion } from './lib/site';

// The intro always starts from the top of the stage.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);
document.documentElement.classList.add(prefersReducedMotion ? 'is-reduced' : 'is-motion');

createRoot(document.getElementById('root')).render(<App />);
