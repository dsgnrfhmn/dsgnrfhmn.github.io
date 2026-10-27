// Pinned header: shrinks in step with the scroll over the first SHRINK_PX
// pixels (--shrink 0 → 1) and is marked .is-stuck as soon as the page is
// scrolled, which shows the hairline (see styles/components/header.css).

const SHRINK_PX = 120;

const header = document.querySelector('[data-header]');

if (header) {
  let pending = false;

  const update = () => {
    pending = false;
    const y = Math.max(window.scrollY, 0);
    header.style.setProperty('--shrink', Math.min(y / SHRINK_PX, 1).toFixed(3));
    header.classList.toggle('is-stuck', y > 0);
  };

  window.addEventListener(
    'scroll',
    () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(update);
    },
    { passive: true },
  );

  update();
}
