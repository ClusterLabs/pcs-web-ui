import * as t from "io-ts";
import { isRight } from "fp-ts/lib/Either";
import { PathReporter } from "io-ts/lib/PathReporter";

import * as auth from "app/services/auth/sagas";

import { validateSameNodes } from "./utils";

const TAuthGuiAgainstNodesResult = t.record(t.string, t.number);
const TAuthGuiAgainstNodesResultFull = t.type({
  node_auth_error: TAuthGuiAgainstNodesResult,
});

export type AuthGuiAgainstNodesResult = t.TypeOf<
  typeof TAuthGuiAgainstNodesResult
>;

const validate = (nodeList: string[], response: any) => {
  const result = TAuthGuiAgainstNodesResultFull.decode(response);
  if (!isRight(result)) {
    return PathReporter.report(result);
  }

  return validateSameNodes(nodeList, Object.keys(response.node_auth_error));
};

export function* AuthGuiAgainstNodes(
  nodeMap: Record<string, {
    password: string;
    destinations: {
      address: string,
      port: string,
    }[];
  }>,
) {
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
  const text = yield auth.postForText(
    "/manage/auth_gui_against_nodes",
    [["data_json", JSON.stringify(nodeMapToAuth)]],
  );

  let errors;
  let authResultMap = null;
  try {
    const authResult = JSON.parse(text);
    errors = validate(Object.keys(nodeMap), authResult);
    if (errors.length === 0) {
      authResultMap = authResult.node_auth_error;
    }
  } catch (e) {
    errors = ["Response is not in expected json format"];
  }
  return { errors, text, authResultMap };
}
