import {endpoints} from "app/backend/endpoints";

import type {RequestData, RouteResponse} from "../mock";

export const canAddClusterOrNodes = ({
  nodeNameList,
  clusterName,
  response,
}: {
  nodeNameList?: string[];
  clusterName?: string;
  response?: RouteResponse;
}) => {
  const query: RequestData["query"] = {};
  if (nodeNameList !== undefined && nodeNameList.length > 0) {
    // see list-values-in-query above
    query["node_names[]"] =
      nodeNameList.length === 1 ? nodeNameList[0] : nodeNameList;
  }
  if (clusterName !== undefined) {
    query.cluster = clusterName;
  }
  return {
    url: endpoints.canAddClusterOrNodes.url,
    query,
    ...(response ?? {text: ""}),
  };
};
