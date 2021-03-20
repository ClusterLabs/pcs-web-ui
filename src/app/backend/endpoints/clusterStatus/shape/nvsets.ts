import * as t from "io-ts";

import { ApiId } from "./common";

export const ApiNVPair = t.type({
  id: ApiId,
  name: t.string,
  value: t.string,
});
