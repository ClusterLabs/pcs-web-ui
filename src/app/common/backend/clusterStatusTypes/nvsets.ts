import * as t from "io-ts";

export const TApiNVPair = t.type({
  id: t.string,
  name: t.string,
  value: t.string,
});
