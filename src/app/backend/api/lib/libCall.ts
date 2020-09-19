import * as t from "io-ts";

import * as types from "app/backend/types";

import { postJsonForJson } from "../../calls";
import { ApiCall, createResult, validateShape } from "../../tools";

const { TApiResponse } = types.libraryResponse;
type Result = t.TypeOf<typeof TApiResponse>;

export type CallLibResult = ApiCall<Result>;

export const callLib: CallLibResult = async ({
  clusterUrlName,
  urlName,
  payload,
}: {
  clusterUrlName: string;
  urlName: string;
  payload: Record<string, unknown>;
}) => {
  const raw = await postJsonForJson(
    `/managec/${clusterUrlName}/api/v1/${urlName}/v1`,
    payload,
  );
  return createResult<Result>(raw, validateShape(raw, TApiResponse));
};
