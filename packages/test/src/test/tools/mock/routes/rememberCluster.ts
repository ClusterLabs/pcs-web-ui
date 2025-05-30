import {endpoints} from "app/backend/endpoints";

import type {RouteResponse} from "../mock";

import {paramsToBody} from "./tools";

const {params, url} = endpoints.rememberCluster;

export const rememberCluster = ({
  clusterName,
  nodeNameList,
  response,
}: {
  clusterName: string;
  nodeNameList: string[];
  response?: RouteResponse;
}) => ({
  url: url,
  body: paramsToBody(params({clusterName, nodeNameList})),
  ...(response ?? {text: ""}),
});
