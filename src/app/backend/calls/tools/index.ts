import * as t from "io-ts";

import { endpoints } from "app/backend/endpoints";

import * as result from "./result";
import * as validate from "./validate";
import * as http from "./http";

type CallResultShape<SHAPE extends t.Any> = Promise<
  result.Overall<t.TypeOf<SHAPE>>
>;

export type CallResult<
  PAYLOAD extends t.Any | string = string,
> = PAYLOAD extends t.Any
  ? CallResultShape<PAYLOAD>
  : Promise<result.Overall<PAYLOAD>>;

export { endpoints, http, validate, t };
