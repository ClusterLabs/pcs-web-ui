import * as apiResult from "app/backend/result";

export type Result<PAYLOAD> = apiResult.Overall<PAYLOAD>;
/* eslint-disable @typescript-eslint/no-explicit-any */
type Call<PAYLOAD> = (...args: any[]) => Promise<Result<PAYLOAD>>;

export type ResultOf<APICALL> = APICALL extends Call<infer PAYLOAD>
  ? Result<PAYLOAD>
  : never;

export type PayloadOf<APICALL> = APICALL extends Call<infer PAYLOAD>
  ? PAYLOAD
  : never;
