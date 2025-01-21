import {endpoints} from "app/backend/endpoints";

import * as responses from "dev/responses";
import type * as types from "dev/types";

import type {RouteResponse} from "../mock";

export const importedClusterList = (
  props:
    | {clusterStatusList?: types.Cluster[]}
    | {clusterNameList?: string[]}
    | {response: RouteResponse} = {},
) => {
  // biome-ignore lint/suspicious/noImplicitAnyLet:
  let response;
  if ("response" in props) {
    response = props.response;
  } else if (
    "clusterNameList" in props &&
    props.clusterNameList !== undefined
  ) {
    response = {
      json: responses.importedClusterList.withClusters(props.clusterNameList),
    };
  } else if (
    "clusterStatusList" in props &&
    props.clusterStatusList !== undefined
  ) {
    response = {
      json: responses.importedClusterList.withClusters(
        props.clusterStatusList.map(
          clusterStatus => clusterStatus.cluster_name,
        ),
      ),
    };
  } else {
    response = {
      json: responses.importedClusterList.withClusters([]),
    };
  }

  return {
    url: endpoints.importedClusterList.url,
    ...response,
  };
};
