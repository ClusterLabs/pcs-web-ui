const storageStyleKey = "shell:style";
const mediaQuery = "(prefers-color-scheme: dark)";

const set = (forcedStyle?: string) => {
  const style = forcedStyle || localStorage.getItem(storageStyleKey) || "auto";
  if (
    style === "dark"
    || (style === "auto" && window.matchMedia?.(mediaQuery).matches)
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
