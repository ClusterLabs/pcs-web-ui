import { types } from "app/store";

import * as tabRoutes from "./tabRoutes";

type StatusSeverity = types.cluster.StatusSeverity;

const severity = (status: StatusSeverity): number => {
  switch (status) {
    case "ERROR": return 3;
    case "WARNING": return 2;
    case "OK": return 0;
    default: return 1;
  }
};

export const compareStatusSeverity = (
  a: StatusSeverity,
  b: StatusSeverity,
): number => (
  severity(a) - severity(b)
);

export const compareStrings = (a: string, b: string): number => {
  const upperA = a.toUpperCase();
  const upperB = b.toUpperCase();
  if (upperA < upperB) {
    return -1;
  }
  if (upperA > upperB) {
    return 1;
  }
  return 0;
};

export const toLabel = (flag: string) => (
  flag[0].toUpperCase() + flag.slice(1).toLowerCase()
);

export const join = (urlPrefix: string, path: string = "") => (
  `${urlPrefix.endsWith("/") ? urlPrefix.slice(0, -1) : urlPrefix}/${path}`
);

export {
  tabRoutes,
};
