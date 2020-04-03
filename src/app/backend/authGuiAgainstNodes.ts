import * as t from "io-ts";

import { postForJson } from "./calls";

import {
  ApiCall,
  createResult,
  validateSameNodes,
  validateShape,
} from "./tools";

const ApiAuthGuiAgainstNodes = t.type({
  node_auth_error: t.record(t.string, t.number),
});

/* eslint-disable @typescript-eslint/no-explicit-any */
const validate = (nodeList: string[], response: any) => {
  const errors = validateShape(response, ApiAuthGuiAgainstNodes);
  if (errors.length > 0) {
    return errors;
  }

  const nodeMap: Result = response;
  return validateSameNodes(nodeList, Object.keys(nodeMap.node_auth_error));
};

type Result = t.TypeOf<typeof ApiAuthGuiAgainstNodes>;

export const authGuiAgainstNodes: ApiCall<Result> = async (
  nodeMap: Record<
    string,
    {
      password: string;
      dest_list: {
        addr: string;
        port: string;
      }[];
    }
  >,
) => {
  const raw = await postForJson("/manage/auth_gui_against_nodes", [
    ["data_json", JSON.stringify({ nodes: nodeMap })],
  ]);
  return createResult<Result>(raw, validate(Object.keys(nodeMap), raw));
};
