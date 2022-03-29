import { endpoints } from "app/backend/endpoints";

import { RouteResponse } from "test/tools/interception";
export const sendKnownHostsToNode = ({
  nodeNameList,
  targetNode,
  response,
}: {
  nodeNameList: string[];
  targetNode: string;
  response?: RouteResponse;
}) => {
  return {
    url: endpoints.sendKnownHostsToNode.url,
    body: { "node_names[]": nodeNameList, target_node: targetNode },
    ...(response ?? { text: "success" }),
  };
};
