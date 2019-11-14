/* eslint-disable camelcase */
import * as t from "io-ts";
import { ApiNVPair } from "./nvsets";

/*
datasource: //alerts//alert
*/
export const ApiAlert = t.type({
  id: t.string,
  path: t.string,
  description: t.string,
  instance_attributes: t.array(ApiNVPair),
  meta_attributes: t.array(ApiNVPair),
  recipient_list: t.array(t.type({
    id: t.string,
    value: t.string,
    description: t.string,
    instance_attributes: t.array(ApiNVPair),
    meta_attributes: t.array(ApiNVPair),
  })),
});
