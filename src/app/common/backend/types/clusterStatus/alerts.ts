/* eslint-disable camelcase */
import * as t from "io-ts";

import { ApiNVPair } from "./nvsets";
import { ApiId } from "./common";

/*
datasource: //alerts//alert
*/
export const ApiAlert = t.type({
  id: ApiId,
  path: t.string,
  description: t.string,
  instance_attributes: t.array(ApiNVPair),
  meta_attributes: t.array(ApiNVPair),
  recipient_list: t.array(t.type({
    id: ApiId,
    value: t.string,
    description: t.string,
    instance_attributes: t.array(ApiNVPair),
    meta_attributes: t.array(ApiNVPair),
  })),
});
