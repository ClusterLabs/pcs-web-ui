import * as tabRoutes from "./tabRoutes";

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
