import {endpoints} from "app/backend/endpoints";

import type {RequestData, RouteResponse} from "../mock";

export const checkAuthAgainstNodes = ({
  nodeNameList,
  response,
}: {
  nodeNameList: string[];
  response?: RouteResponse;
}) => {
  const query: RequestData["query"] = {};
  if (nodeNameList !== undefined && nodeNameList.length > 0) {
    // see list-values-in-query above
    query["node_list[]"] =
      nodeNameList.length === 1 ? nodeNameList[0] : nodeNameList;
  }
  return {
    url: endpoints.checkAuthAgainstNodes.url,
    query,
    ...(response ?? {
      json: nodeNameList.reduce(
        (nodeResults, nodeName) => ({
          ...nodeResults,
          [nodeName]: "Online",
        }),
        {},
      ),
    }),
  };
};
