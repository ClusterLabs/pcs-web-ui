import * as t from "io-ts";
import * as types from "app/backend/types";

import { postForJson } from "../calls";
import { ApiCall, createResult, validateShape } from "../tools";

const { TApiResponse } = types.libraryResponse;
type Result = t.TypeOf<typeof TApiResponse>;

export const resourceCreate: ApiCall<Result> = async ({
  clusterUrlName,
  resourceName,
  agentName,
}: {
  clusterUrlName: string;
  resourceName: string;
  agentName: string;
}) => {
  const raw = await postForJson(`/managec/${clusterUrlName}/resource-create`, [
    [
      "create_data",
      JSON.stringify({
        resource_id: resourceName,
        resource_agent_name: agentName,
        operation_list: [],
        meta_attributes: {},
        instance_attributes: {},
      }),
    ],
  ]);
  return createResult<Result>(raw, validateShape(raw, TApiResponse));
};
