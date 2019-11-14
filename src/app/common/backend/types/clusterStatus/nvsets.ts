import * as t from "io-ts";

export const ApiNVPair = t.type({
  id: t.string,
  name: t.string,
  value: t.string,
});
