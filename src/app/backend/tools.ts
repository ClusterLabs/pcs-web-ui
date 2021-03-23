import * as t from "io-ts";

import * as apiResult from "app/backend/result";

import * as validate from "./validate";
import * as http from "./http";
import { endpoints } from "./endpoints";

type CallResultShape<SHAPE extends t.Any> = Promise<
  apiResult.Overall<t.TypeOf<SHAPE>>
>;

export type CallResult<
  PAYLOAD extends t.Any | string = string,
> = PAYLOAD extends t.Any
  ? CallResultShape<PAYLOAD>
  : Promise<apiResult.Overall<PAYLOAD>>;

export { endpoints, http, validate, t };
