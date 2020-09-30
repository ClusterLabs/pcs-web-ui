import * as t from "io-ts";

import * as apiResult from "./apiResult";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Call<PAYLOAD> = (
  ...args: any[]
) => Promise<apiResult.Overall<PAYLOAD>>;

export type CallShape<SHAPE extends t.Any> = Call<t.TypeOf<SHAPE>>;
