import * as t from "io-ts";
import { isRight } from "fp-ts/lib/Either";
import { PathReporter } from "io-ts/lib/PathReporter";

import * as api from "app/common/api";
import { validateSameNodes } from "./utils";
import { ApiCallResult, createResult } from "./result";
import { dealWithNoAuth } from "./dealWithNoAuth";

const TCheckAuthAgainstNodesResult = t.record(t.string, t.keyof({
  Online: null,
  Offline: null,
  "Unable to authenticate": null,
}));

const validate = (nodeList: string[], response: any) => {
  if (typeof response !== "object") {
    return ["It is not object."];
  }

  const errors = validateSameNodes(nodeList, Object.keys(response));

  if (errors.length > 0) {
    return errors;
  }

  const result = TCheckAuthAgainstNodesResult.decode(response);
  if (!isRight(result)) {
    return PathReporter.report(result);
  }
  return [];
};

export type Result = t.TypeOf<typeof TCheckAuthAgainstNodesResult>;

export const call = dealWithNoAuth(async (
  nodeList: string[],
): Promise<ApiCallResult<Result>> => {
  const uniqueNodeList = Array.from(new Set(nodeList));
  const raw = await api.call.getJson(
    "/manage/check_auth_against_nodes",
    uniqueNodeList.map(node => ["node_list[]", node]),
  );

  return createResult<Result>(
    raw,
    validate(uniqueNodeList, raw),
  );
});
