import {Notification} from "./types";

export const severityToVariant = (severity: Notification["severity"]) => {
  switch (severity) {
    case "SUCCESS":
      return "success";

    case "ERROR":
      return "danger";

    default:
      return "info";
  }
};
