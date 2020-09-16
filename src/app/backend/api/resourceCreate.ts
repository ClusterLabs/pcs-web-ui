import * as t from "io-ts";

import * as types from "app/backend/types";

import { postJsonForJson } from "../calls";
import { ApiCall, createResult, validateShape } from "../tools";

const { TApiResponse } = types.libraryResponse;
type Result = t.TypeOf<typeof TApiResponse>;

export const resourceCreate: ApiCall<Result> = async ({
  clusterUrlName,
  resourceName,
  agentName,
  instanceAttrs,
  disabled,
}: {
  clusterUrlName: string;
  resourceName: string;
  agentName: string;
  instanceAttrs: Record<string, string>;
  disabled: boolean;
}) => {
  const raw = await postJsonForJson(
    `/managec/${clusterUrlName}/api/v1/resource-create/v1`,
    {
      resource_id: resourceName,
      resource_agent_name: agentName,
      operation_list: [],
      meta_attributes: {},
      instance_attributes: instanceAttrs,
      ensure_disabled: disabled,
    },
  );
  return createResult<Result>(raw, validateShape(raw, TApiResponse));
};
