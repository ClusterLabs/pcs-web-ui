// Cockpit is included into page by another javascript file
/*global cockpit*/

// The following can be replaced by sed in build script. Don't change it
// blindly!
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

var superuser = Superuser();

/* eslint-disable-next-line */
var pcsUiEnvAdapter = {
  showMasthead: false,
  request: async (path, headers, postBody) => {
    try {
      const http = cockpit.http(pcsdSocket, {superuser: "try"});
      const result =
        postBody !== undefined
          ? await http.post(path, postBody, headers)
          : await http.get(path, {}, headers);
      return {
        status: 200,
        statusText: "OK",
        text: result,
      };
    } catch (e) {
      if ("status" in e) {
        return {
          status: e.status,
          statusText: e.reason,
          text: e.message,
        };
      }
      if (e.problem === "not-found") {
        return {type: "BACKEND_NOT_FOUND"};
      }
      return {
        type: "NON_HTTP_PROBLEM",
        problem: e.problem,
      };
    }
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
};
