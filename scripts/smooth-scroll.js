// Smooth, inertial wheel and trackpad scrolling (Lenis, vendored copy).
// Touch keeps the native scroll. Off when the visitor asks for reduced motion.

import Lenis from './vendor/lenis-1.3.26/lenis.mjs';

// Share of the remaining distance covered each frame; lower is smoother
// (Lenis default 0.1).
const LERP = 0.135;

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  new Lenis({ lerp: LERP, autoRaf: true });
}
