const THEME_KEY = "retnow-theme";

function getPreferredTheme() {
  const storedTheme = localStorage.getItem(THEME_KEY);

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;

  const toggle = document.querySelector("[data-theme-toggle]");
  if (!toggle) {
    return;
  }

  const nextTheme = theme === "dark" ? "light" : "dark";
  toggle.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
  toggle.setAttribute("aria-pressed", String(theme === "dark"));
}

document.addEventListener("DOMContentLoaded", () => {
  applyTheme(getPreferredTheme());

  const toggle = document.querySelector("[data-theme-toggle]");
  if (!toggle) {
    return;
  }

  toggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.dataset.theme === "dark"
      ? "dark"
      : "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    localStorage.setItem(THEME_KEY, nextTheme);
    applyTheme(nextTheme);
  });
});
