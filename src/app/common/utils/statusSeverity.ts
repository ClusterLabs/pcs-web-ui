import { StatusSeverity } from "../types";

export function itemsToSummarySeverity<T>(
  itemToStatus: (item: T) => StatusSeverity,
) {
  return (itemList: T[]) => itemList.reduce<StatusSeverity>(
    (sumStatus, item) => {
      const statuses = [itemToStatus(item), sumStatus];
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
    },
    "OK",
  );
}

const severity = (status: StatusSeverity): number => {
  switch (status) {
    case "ERROR": return 3;
    case "WARNING": return 2;
    case "OK": return 0;
    default: return 1;
  }
};

export const compare = (a: StatusSeverity, b: StatusSeverity): number => (
  severity(a) - severity(b)
);
