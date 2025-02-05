import * as result from "./calls/tools/result";

// biome-ignore lint/suspicious/noExplicitAny:
type Call<PAYLOAD> = (..._args: any[]) => Promise<result.Overall<PAYLOAD>>;

export type ResultOf<APICALL> = APICALL extends Call<infer PAYLOAD>
  ? result.Overall<PAYLOAD>
  : never;

export type PayloadOf<APICALL> = APICALL extends Call<infer PAYLOAD>
  ? PAYLOAD
  : never;

export * as Lib from "./apiLib";

export {result};
