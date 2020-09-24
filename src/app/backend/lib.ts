import * as t from "io-ts";

import { Call } from "./call";
import * as types from "./types";
import * as http from "./http";

const { TApiResponse: shape } = types.libraryResponse;
export type Payload = t.TypeOf<typeof shape>;

export const callCluster: Call<Payload> = async ({
  clusterUrlName,
  commandUrlName,
  payload,
}: {
  clusterUrlName: string;
  commandUrlName: string;
  payload: ReturnType<typeof JSON.parse>;
}) => {
  return http.post(`/managec/${clusterUrlName}/api/v1/${commandUrlName}/v1`, {
    payload,
    shape,
  });
};
