/* eslint-disable camelcase */
import * as t from "io-ts";

import * as api from "app/common/api";

import {
  ApiCall,
  createResult,
  validateShape,
  validateSameNodes,
  dealWithNoAuth,
  dealWithInvalidJson,
} from "./tools";

const TAuthGuiAgainstNodesResult = t.type({
  node_auth_error: t.record(t.string, t.number),
});

const validate = (nodeList: string[], response: any) => {
  const errors = validateShape(response, TAuthGuiAgainstNodesResult);
  if (errors.length > 0) {
    return errors;
  }

  const nodeMap: Result = response;
  return validateSameNodes(nodeList, Object.keys(nodeMap.node_auth_error));
};

export type Result = t.TypeOf<typeof TAuthGuiAgainstNodesResult>;

export const apiCall: ApiCall<Result> = async (
  nodeMap: Record<string, {
    password: string;
    dest_list: {
      addr: string,
      port: string,
    }[];
  }>,
) => {
  const raw = await api.call.postForJson(
    "/manage/auth_gui_against_nodes",
    [["data_json", JSON.stringify({ nodes: nodeMap })]],
  );
  return createResult<Result>(raw, validate(Object.keys(nodeMap), raw));
};

export const call = dealWithNoAuth(dealWithInvalidJson(apiCall));
