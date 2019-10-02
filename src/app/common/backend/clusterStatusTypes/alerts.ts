/* eslint-disable camelcase */
import { ApiNVPair } from "./nvsets";

/*
datasource: //alerts//alert
*/
export interface ApiAlert {
  id: string;
  path: string;
  description: string;
  instance_attributes: ApiNVPair[];
  meta_attributes: ApiNVPair[];
  recipient_list: {
    id: string;
    value: string;
    description: string;
    instance_attributes: ApiNVPair[];
    meta_attributes: ApiNVPair[];
  }[];
}
