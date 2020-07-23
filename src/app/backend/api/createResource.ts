import * as t from "io-ts";

import { postForJson } from "../calls";
import { ApiCall, createResult, validateShape } from "../tools";

const ApiCreateResource = t.partial({
  error: t.literal("true"),
  stdout: t.string,
  stderr: t.string,
});
type Result = t.TypeOf<typeof ApiCreateResource>;

export const createResource: ApiCall<Result> = async ({
  clusterUrlName,
  resourceName,
  agentName,
}: {
  clusterUrlName: string;
  resourceName: string;
  agentName: string;
}) => {
  const raw = await postForJson(`/managec/${clusterUrlName}/update_resource`, [
    ["name", resourceName],
    ["resource_type", agentName],
  ]);
  return createResult<Result>(raw, validateShape(raw, ApiCreateResource));
};
