import { StatusSeverity } from "../types";

export const max = (a: StatusSeverity, b: StatusSeverity): StatusSeverity => {
  const statuses = [a, b];
  if (statuses.includes("ERROR")) {
    return "ERROR";
  }
  if (statuses.includes("WARNING")) {
    return "WARNING";
  }
  if (statuses.includes("UNKNOWN")) {
    return "UNKNOWN";
  }
  return "OK";
};
