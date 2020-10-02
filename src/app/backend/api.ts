import * as types from "./types";
import * as log from "./log";
import * as result from "./apiResult";
import { Call as TCall, Result as TResult } from "./call";
import * as lib from "./lib";

export type Call<PAYLOAD = string> = TCall<PAYLOAD>;

export type Result<PAYLOAD> = TResult<PAYLOAD>;

export type ResultOf<APICALL> = APICALL extends Call<infer PAYLOAD>
  ? Result<PAYLOAD>
  : never;

export type PayloadOf<APICALL> = APICALL extends Call<infer PAYLOAD>
  ? PAYLOAD
  : never;

export type LibPayload = PayloadOf<typeof lib.call>;
export { types, log, result, lib };
