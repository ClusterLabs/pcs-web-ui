// Cockpit is included into page by another javascript file
/*global cockpit*/

// The following can be replaced by sed in build script. Don't change it
// blindly!
var pcsdSocket = "/var/run/pcsd.socket";

// Variable pcsUiEnvAdapter will be used by main application included by another
// javascript file
/* eslint-disable-next-line */
var pcsUiEnvAdapter = {
  showMasthead: false,
  request: async (path, headers, postBody) => {
    try {
      const http = cockpit.http(pcsdSocket, {superuser: "try"});
      const result = postBody
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
      return {
        status: 500,
        statusText: e.problem,
        text: e.message,
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
  user: async () => {
    const currentUser = await cockpit.user();
    return {
      isHaclient: currentUser.groups.includes("haclient"),
    };
  },
};
