const getStandardLocationLayer = () => {
  const popstate = "popstate";
  const pushState = "pushState";
  const replaceState = "replaceState";
  const events = [popstate, pushState, replaceState];
  return {
    getPath: () => window.location.pathname,

    getSearch: () => window.location.search,

    addEventsListener: (listener: () => void) =>
      events.forEach(e => window.addEventListener(e, listener)),

    removeEventsListener: (listener: () => void) =>
      events.forEach(e => window.removeEventListener(e, listener)),

    navigate: (to: string, {replace = false} = {}) =>
      window.history[replace ? replaceState : pushState](null, "", to),

    setup: () => {
      // While History API does have `popstate` event, the only
      // proper way to listen to changes via `push/replaceState`
      // is to monkey-patch these methods.
      //
      // See https://stackoverflow.com/a/4585031
      if (typeof window.history !== "undefined") {
        const originalPushState = window.history.pushState;

        window.history.pushState = function (
          ...args: Parameters<typeof window.history.pushState>
        ) {
          const result = originalPushState.apply(this, args);
          const event = new CustomEvent("pushState", {detail: args});

          dispatchEvent(event);
          return result;
        };

        const originalReplaceState = window.history.replaceState;

        window.history.replaceState = function (
          ...args: Parameters<typeof window.history.replaceState>
        ) {
          const result = originalReplaceState.apply(this, args);
          const event = new CustomEvent("replaceState", {detail: args});

          dispatchEvent(event);
          return result;
        };
      }
    },
  };
};

const getCockpitLocationLayer = (cockpit: Cockpit) => ({
  getPath: () => cockpit.location.href.split("?")[0],

  getSearch: () => {
    const parts = cockpit.location.href.split("?");
    return (parts[1] || "").length > 0 ? `?${parts[1]}` : "";
  },

  addEventsListener: (listener: () => void) =>
    cockpit.addEventListener("locationchanged", listener),

  removeEventsListener: (listener: () => void) =>
    cockpit.removeEventListener("locationchanged", listener),

  navigate: (to: string, {replace = false} = {}) =>
    cockpit.location[replace ? "replace" : "go"](to),

  setup: () => {
    // no setup needed for cockpit
  },
});

export const locationLayer =
  process.env.REACT_APP_PCS_WEB_UI_ENVIRONMENT === "cockpit"
    ? getCockpitLocationLayer(cockpit)
    : getStandardLocationLayer();
