import * as t from "io-ts";

import { getJson } from "./calls";

import {
  ApiCall,
  createResult,
  validateSameNodes,
  validateShape,
} from "./tools";

const ApiCheckAuthAgainstNodes = t.record(
  t.string,
  t.keyof({
    Online: null,
    Offline: null,
    "Unable to authenticate": null,
  }),
);

/* eslint-disable @typescript-eslint/no-explicit-any */
const validate = (nodeList: string[], response: any) => {
  let errors = validateShape(response, ApiCheckAuthAgainstNodes);
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

type Result = t.TypeOf<typeof ApiCheckAuthAgainstNodes>;

export const checkAuthAgainstNodes: ApiCall<Result> = async (
  nodeList: string[],
) => {
  const uniqueNodeList = Array.from(new Set(nodeList));
  const raw = await getJson(
    "/manage/check_auth_against_nodes",
    uniqueNodeList.map(node => ["node_list[]", node]),
  );

  return createResult<Result>(raw, validate(uniqueNodeList, raw));
};
