export const toLabel = (flag: string) =>
  (flag[0].toUpperCase() + flag.slice(1).toLowerCase()).replace(/_/g, " ");

export const join = (urlPrefix: string, path = "") =>
  `${urlPrefix.endsWith("/") ? urlPrefix.slice(0, -1) : urlPrefix}/${path}`;
