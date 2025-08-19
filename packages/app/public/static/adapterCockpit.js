// Cockpit is included into page by another javascript file
/*global cockpit*/

// The following can be replaced by sed in build script. Don't change it
// blindly!
// biome-ignore lint/suspicious/noVar: should be visible in main app
var pcsdSocket = "/var/run/pcsd.socket";

// Variable pcsUiEnvAdapter will be used by main application included by another
// javascript file

function Superuser() {
  const proxy = cockpit
    .dbus(null, {bus: "internal"})
    .proxy("cockpit.Superuser", "/superuser");
  let reload_on_change = false;

  const compute_allowed = () => {
    if (!proxy.valid || proxy.Current === "init") return null;
    return proxy.Current !== "none";
  };

  const self = {
    allowed: compute_allowed(),
    reload_page_on_change,
  };

  cockpit.event_target(self);

  function changed(allowed) {
    if (self.allowed !== allowed) {
      if (self.allowed !== null && reload_on_change) {
        window.location.reload(true);
      } else {
        const prev = self.allowed;
        self.allowed = allowed;
        self.dispatchEvent("changed");
        if (prev != null) self.dispatchEvent("reconnect");
      }
    }
  }

  proxy.wait(() => {
    if (!proxy.valid) {
      // Fall back to cockpit.permissions
      const permission = cockpit.permission({admin: true});
      const update = () => {
        changed(permission.allowed);
      };
      permission.addEventListener("changed", update);
      update();
    }
  });

  proxy.addEventListener("changed", () => {
    changed(compute_allowed());
  });

  function reload_page_on_change() {
    reload_on_change = true;
  }

  return self;
}

// biome-ignore lint/suspicious/noVar: should be visible in main app
var superuser = Superuser();

// Variable pcsUiEnvAdapter will be used by main application included by another
// javascript file
window.pcsUiEnvAdapter = {
  showMasthead: false,
  topModal: true,
  request: async (path, headers, postBody) => {
    const dispatchPcsdResponse = () =>
      document.dispatchEvent(
        new CustomEvent("pcsd-response", {detail: {url: path}}),
      );
    return new Promise((resolve, reject) => {
      try {
        const http = cockpit.http(pcsdSocket, {superuser: "try"});
        const requestPromise =
          postBody !== undefined
            ? http.post(path, postBody, headers)
            : http.get(path, {}, headers);

        requestPromise
          .then(result => {
            dispatchPcsdResponse();
            resolve({
              status: 200,
              statusText: "OK",
              text: result,
            });
          })
          .catch((e, data) => {
            dispatchPcsdResponse();
            if ("status" in e) {
              resolve({
                status: e.status,
                statusText: e.reason,
                text: data ?? e.message,
              });
            } else if (e.problem === "not-found") {
              resolve({type: "BACKEND_NOT_FOUND"});
            } else {
              resolve({
                type: "NON_HTTP_PROBLEM",
                problem: e.problem,
              });
            }
          });
      } catch (e) {
        reject(e);
      }
    });
  },
  location: {
    getPath: () => cockpit.location.href.split("?")[0],

    getSearch: () => {
      const parts = cockpit.location.href.split("?");
      return (parts[1] || "").length > 0 ? `?${parts[1]}` : "";
    },

    addEventsListener: listener =>
      cockpit.addEventListener("locationchanged", listener),

    removeEventsListener: listener =>
      cockpit.removeEventListener("locationchanged", listener),

    navigate: (to, {replace = false} = {}) =>
      cockpit.location[replace ? "replace" : "go"](to),

    resolve: to => `#${to}`,
    // resolve: to => `${window.top.location.href.split("#")[0]}#${to}`,
  },
  user: {
    isHaclient: async () => (await cockpit.user()).groups.includes("haclient"),
    isSuperuser: () => !!superuser.allowed,
    addChangeListener: listener => {
      superuser.addEventListener("changed", listener);
    },
  },
  colorScheme: {
    storageKey: "shell:style",
    addChangeListener: listener => {
      // Cockpit: When changing the theme from the shell switcher the
      // localstorage change will not fire for the same page (aka shell) so we
      // need to listen for the event on the window object.
      window.addEventListener("cockpit-style", event => {
        listener(event.detail.style);
      });
    },
    dispatchChangeEvent: (/*requestedTheme*/) => {
      // This event is dispatched from cockpit. Pcs-web-ui should not set this.
    },
  },
  jump: path => cockpit.jump(path),
};
