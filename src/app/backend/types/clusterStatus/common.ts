import * as t from "io-ts";

export const ApiId = t.string;
export const ApiResourceId = ApiId;

export const ApiScore = t.union([
  // t.number,
  // type number is correct, however from backend it comes as a string
  t.string,
  t.keyof({ INFINITY: null, "-INFINITY": null, "+INFINITY": null }),
]);
