import { types } from "app/store/reducers";

type StatusSeverity = types.cluster.StatusSeverity;

export const max = (a: StatusSeverity, b: StatusSeverity): StatusSeverity => {
  const statuses = [a, b];
  if (statuses.includes("ERROR")) {
    return "ERROR";
  }
  if (statuses.includes("WARNING")) {
    return "WARNING";
  }
  return "OK";
};
