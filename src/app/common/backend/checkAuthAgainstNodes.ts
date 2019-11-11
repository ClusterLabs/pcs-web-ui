import * as t from "io-ts";

import * as api from "app/common/api";

import {
  ApiCall,
  createResult,
  dealWithNoAuth,
  validateShape,
  validateSameNodes,
} from "./tools";

const TCheckAuthAgainstNodesResult = t.record(t.string, t.keyof({
  Online: null,
  Offline: null,
  "Unable to authenticate": null,
}));

const validate = (nodeList: string[], response: any) => {
  let errors = validateShape(response, TCheckAuthAgainstNodesResult);
  if (errors.length > 0) {
    return errors;
  }

  const nodeResultMap: Result = response;
  errors = validateSameNodes(nodeList, Object.keys(nodeResultMap));
  if (errors.length > 0) {
    return errors;
  }

  return [];
};

export type Result = t.TypeOf<typeof TCheckAuthAgainstNodesResult>;

export const apiCall: ApiCall<Result> = async (nodeList: string[]) => {
  const uniqueNodeList = Array.from(new Set(nodeList));
  const raw = await api.call.getJson(
    "/manage/check_auth_against_nodes",
    uniqueNodeList.map(node => ["node_list[]", node]),
  );

  return createResult<Result>(raw, validate(uniqueNodeList, raw));
};

export const call = dealWithNoAuth(apiCall);
