/* eslint-disable camelcase */
import * as t from "io-ts";
import { TApiNVPair } from "./nvsets";

/*
datasource: //alerts//alert
*/
export const TApiAlert = t.type({
  id: t.string,
  path: t.string,
  description: t.string,
  instance_attributes: t.array(TApiNVPair),
  meta_attributes: t.array(TApiNVPair),
  recipient_list: t.array(t.type({
    id: t.string,
    value: t.string,
    description: t.string,
    instance_attributes: t.array(TApiNVPair),
    meta_attributes: t.array(TApiNVPair),
  })),
});
