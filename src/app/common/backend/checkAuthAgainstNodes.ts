import * as t from "io-ts";
import { isRight } from "fp-ts/lib/Either";
import { PathReporter } from "io-ts/lib/PathReporter";

import * as auth from "app/services/auth/sagas";

import { validateSameNodes } from "./utils";
import { ApiCallGeneratorResult, createResult } from "./result";

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

export type CheckAuthAgainstNodesResult = t.TypeOf<
  typeof TCheckAuthAgainstNodesResult
>;

export function* checkAuthAgainstNodes(
  nodeList: string[],
): ApiCallGeneratorResult<CheckAuthAgainstNodesResult> {
  const uniqueNodeList = Array.from(new Set(nodeList));
  const raw = yield auth.getJson(
    "/manage/check_auth_against_nodes",
    uniqueNodeList.map(node => ["node_list[]", node]),
  );

  return createResult<CheckAuthAgainstNodesResult>(
    raw,
    validate(uniqueNodeList, raw),
  );
}
