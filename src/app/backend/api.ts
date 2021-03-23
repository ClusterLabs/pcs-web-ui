import * as log from "./log";
import * as result from "./apiResult";
import { libCallCluster } from "./calls";
import {
  Call as TCall,
  PayloadOf as TPayloadOf,
  Result as TResult,
  ResultOf as TResultOf,
} from "./call";

export type Call<PAYLOAD = string> = TCall<PAYLOAD>;
export type Result<PAYLOAD> = TResult<PAYLOAD>;
export type ResultOf<APICALL> = TResultOf<APICALL>;
export type PayloadOf<APICALL> = TPayloadOf<APICALL>;

export type LibReport = PayloadOf<typeof libCallCluster>["report_list"][number];

export { log, result };
