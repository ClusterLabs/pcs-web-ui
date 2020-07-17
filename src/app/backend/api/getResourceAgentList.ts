import * as t from "io-ts";

import { getJson } from "../calls";

import {
  ApiCall,
  createResult,
  dealWithInvalidJson,
  validateShape,
} from "../tools";

const ApiResourceAgentList = t.array(
  t.type({
    full_name: t.string,
    class_provider: t.string,
    type: t.string,
  }),
);

type Result = t.TypeOf<typeof ApiResourceAgentList>;

export const getResourceAgentList: ApiCall<Result> = async (
  clusterUrlName: string,
) => {
  try {
    const raw = await getJson(
      `/managec/${clusterUrlName}/get_resource_agent_list`,
    );
    return createResult<Result>(raw, validateShape(raw, ApiResourceAgentList));
  } catch (e) {
    return dealWithInvalidJson(e);
  }
};
