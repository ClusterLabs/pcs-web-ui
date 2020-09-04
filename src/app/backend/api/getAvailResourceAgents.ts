import * as t from "io-ts";

import { getJson } from "../calls";
import {
  ApiCall,
  createResult,
  dealWithInvalidJson,
  validateShape,
} from "../tools";

const ApiResourceAgentMap = t.record(
  t.string,
  t.type({
    full_name: t.string,
    class_provider: t.string,
    class: t.string,
    provider: t.union([t.string, t.null]),
    type: t.string,
  }),
);

type Result = t.TypeOf<typeof ApiResourceAgentMap>;

export const getAvailResourceAgents: ApiCall<Result> = async (
  clusterUrlName: string,
) => {
  try {
    const raw = await getJson(
      `/managec/${clusterUrlName}/get_avail_resource_agents`,
    );
    return createResult<Result>(raw, validateShape(raw, ApiResourceAgentMap));
  } catch (e) {
    return dealWithInvalidJson(e);
  }
};
