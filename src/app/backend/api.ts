import * as types from "./types";
import * as log from "./log";
import * as result from "./apiResult";
import { Call as TCall } from "./call";
import { Payload as TLibPayload } from "./lib";

export { types, log, result };

export type Call<PAYLOAD = string> = TCall<PAYLOAD>;

export type PayloadOf<APICALL> = APICALL extends Call<infer PAYLOAD>
  ? PAYLOAD
  : never;

export type ResultOf<APICALL> = APICALL extends Call<infer PAYLOAD>
  ? result.Overall<PAYLOAD>
  : never;

export type LibPayload = TLibPayload;
