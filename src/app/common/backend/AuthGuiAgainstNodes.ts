import * as t from "io-ts";
import { isRight } from "fp-ts/lib/Either";
import { PathReporter } from "io-ts/lib/PathReporter";

import * as auth from "app/services/auth/sagas";

import { validateSameNodes } from "./utils";
import { ApiCallGeneratorResult, createResult } from "./result";

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

export type AuthGuiAgainstNodesResult = t.TypeOf<
  typeof TAuthGuiAgainstNodesResult
>;

export function* authGuiAgainstNodes(
  nodeMap: Record<string, {
    password: string;
    destinations: {
      address: string,
      port: string,
    }[];
  }>,
): ApiCallGeneratorResult<AuthGuiAgainstNodesResult> {
  const nodeMapToAuth = {
    nodes: Object.keys(nodeMap).reduce(
      (nodes, nodeName) => ({
        ...nodes,
        [nodeName]: {
          password: nodeMap[nodeName].password,
          dest_list: nodeMap[nodeName].destinations.map(
            destination => ({
              addr: destination.address,
              port: destination.port,
            }),
          ),
        },
      }),
      {},
    ),
  };
  const raw = yield auth.postForText(
    "/manage/auth_gui_against_nodes",
    [["data_json", JSON.stringify(nodeMapToAuth)]],
  );

  try {
    const authResult = JSON.parse(raw || "");
    return createResult<AuthGuiAgainstNodesResult>(
      authResult,
      validate(Object.keys(nodeMap), authResult),
    );
  } catch (e) {
    return createResult<AuthGuiAgainstNodesResult>(
      raw,
      ["Response is not in expected json format"],
    );
  }
}
