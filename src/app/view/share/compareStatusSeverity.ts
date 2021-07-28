import { StatusSeverity } from "app/view/cluster/types";

const severity = (status: StatusSeverity): number => {
  switch (status) {
    case "ERROR":
      return 3;

    case "WARNING":
      return 2;

    case "OK":
      return 0;

    default:
      return 1;
  }
};

export const compareStatusSeverity = (
  a: StatusSeverity,
  b: StatusSeverity,
): number => severity(a) - severity(b);
