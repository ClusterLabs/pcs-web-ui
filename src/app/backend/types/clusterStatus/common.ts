import * as t from "io-ts";

export const ApiId = t.string;
export const ApiResourceId = ApiId;

export const ApiScore = t.union([
  t.number,
  t.keyof({ INFINITY: null, "-INFINITY": null }),
]);
