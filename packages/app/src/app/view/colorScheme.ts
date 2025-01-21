const storageStyleKey = pcsUiEnvAdapter.colorScheme.storageKey;
const mediaQuery = "(prefers-color-scheme: dark)";
const dispatchChange = pcsUiEnvAdapter.colorScheme.dispatchChangeEvent;

const set = (forcedStyle?: string) => {
  const style = forcedStyle || getLocalStyle();
  if (
    style === "dark" ||
    (style === "auto" && window.matchMedia?.(mediaQuery).matches)
  ) {
    document.documentElement.classList.add("pf-v5-theme-dark");
  } else {
    document.documentElement.classList.remove("pf-v5-theme-dark");
  }
};

export const setup = () => {
  window.matchMedia(mediaQuery).addEventListener("change", () => set());
  window.addEventListener("storage", event => {
    if (event.key === storageStyleKey) {
      set();
    }
  });
  pcsUiEnvAdapter.colorScheme.addChangeListener(style => set(style));
  set();
};

export const getLocalStyle = () =>
  localStorage.getItem(storageStyleKey) || "auto";

export const setLocalStyle = (theme: Parameters<typeof dispatchChange>[0]) => {
  localStorage.setItem(storageStyleKey, theme);
  dispatchChange(theme);
};
