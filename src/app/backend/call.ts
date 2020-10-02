import * as t from "io-ts";

import * as apiResult from "./apiResult";

export type Result<PAYLOAD> = apiResult.Overall<PAYLOAD>;
/* eslint-disable @typescript-eslint/no-explicit-any */
export type Call<PAYLOAD> = (...args: any[]) => Promise<Result<PAYLOAD>>;

type CallResultShape<SHAPE extends t.Any> = Promise<
  apiResult.Overall<t.TypeOf<SHAPE>>
>;
export type CallResult<
  PAYLOAD extends t.Any | string = string
> = PAYLOAD extends t.Any
  ? CallResultShape<PAYLOAD>
  : Promise<apiResult.Overall<PAYLOAD>>;
