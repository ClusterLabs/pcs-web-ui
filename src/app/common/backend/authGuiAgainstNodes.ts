/* eslint-disable camelcase */
import * as t from "io-ts";
import { isRight } from "fp-ts/lib/Either";
import { PathReporter } from "io-ts/lib/PathReporter";

import * as api from "app/common/api";

import { validateSameNodes } from "./utils";
import { dealWithNoAuth } from "./dealWithNoAuth";
import { dealWithInvalidJson } from "./dealWithInvalidJson";
import { ApiCallResult, createResult } from "./result";

const TAuthGuiAgainstNodesResult = t.type({
  node_auth_error: t.record(t.string, t.number),
});

const validate = (nodeList: string[], response: any) => {
  const result = TAuthGuiAgainstNodesResult.decode(response);
  if (!isRight(result)) {
    return PathReporter.report(result);
  }

  return validateSameNodes(nodeList, Object.keys(response.node_auth_error));
};

export type Result = t.TypeOf<typeof TAuthGuiAgainstNodesResult>;

export const call = dealWithNoAuth(dealWithInvalidJson(async (
  nodeMap: Record<string, {
    password: string;
    dest_list: {
      addr: string,
      port: string,
    }[];
  }>,
): Promise<ApiCallResult<Result>> => {
  const raw = await api.call.postForJson(
    "/manage/auth_gui_against_nodes",
    [["data_json", JSON.stringify({ nodes: nodeMap })]],
  );
  return createResult<Result>(raw, validate(Object.keys(nodeMap), raw));
}));
