// Light/dark theme toggle. The initial theme is set by an inline script in
// <head> (index.html) so the page never flashes the wrong colors.
// Until the visitor picks one, the theme follows the system setting.
// Based on the website repo (src/theme.js); here the button is an icon.

const KEY = 'theme';
const root = document.documentElement;
const toggle = document.querySelector('[data-theme-toggle]');
const system = window.matchMedia('(prefers-color-scheme: dark)');

function saved() {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function apply(theme) {
  root.dataset.theme = theme;
  if (!toggle) return;
  const dark = theme === 'dark';
  // The icon (sun or moon) shows the current theme and animates in CSS;
  // the label names the theme the button switches to.
  const label = dark ? 'Switch to light theme' : 'Switch to dark theme';
  toggle.setAttribute('aria-pressed', String(dark));
  toggle.setAttribute('aria-label', label);
  toggle.title = label;
}

apply(root.dataset.theme === 'dark' ? 'dark' : 'light');

toggle?.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  apply(next);
  try {
    localStorage.setItem(KEY, next);
  } catch {
    // Storage blocked (private mode): the choice lasts for this page only.
  }
});

system.addEventListener('change', (event) => {
  if (!saved()) apply(event.matches ? 'dark' : 'light');
});
