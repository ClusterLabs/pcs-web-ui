import {endpoints} from "app/backend/endpoints";

import type * as types from "dev/types";

import type {RouteResponse} from "../mock";

export const clusterStatus = (
  props: {clusterStatus: types.Cluster} | {response: RouteResponse},
) => {
  const response: RouteResponse =
    "response" in props ? props.response : {json: props.clusterStatus};

  return {
    url: endpoints.clusterStatus.url,
    ...response,
  };
};
