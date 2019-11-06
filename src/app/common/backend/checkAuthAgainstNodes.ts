import * as t from "io-ts";
import { isRight } from "fp-ts/lib/Either";
import { PathReporter } from "io-ts/lib/PathReporter";

import * as auth from "app/services/auth/sagas";

import { validateSameNodes } from "./utils";

const TCheckAuthNodeResult = t.keyof({
  Online: null,
  Offline: null,
  "Unable to authenticate": null,
});

const TCheckAuthResult = t.record(t.string, TCheckAuthNodeResult);

const validate = (nodeList: string[], response: any) => {
  if (typeof response !== "object") {
    return ["It is not object."];
  }

  const errors = validateSameNodes(nodeList, Object.keys(response));

  if (errors.length > 0) {
    return errors;
  }

  const result = TCheckAuthResult.decode(response);
  if (!isRight(result)) {
    return PathReporter.report(result);
  }
  return [];
};

export type CheckAuthNodeResult = t.TypeOf<typeof TCheckAuthNodeResult>;

export function* checkAuthAgainstNodes(nodeList: string[]) {
  const uniqueNodeList = Array.from(new Set(nodeList));
  const nodesStatusMap = yield auth.getJson(
    "/manage/check_auth_against_nodes",
    uniqueNodeList.map(node => ["node_list[]", node]),
  );

  return {
    errors: validate(uniqueNodeList, nodesStatusMap),
    nodesStatusMap,
  };
}
