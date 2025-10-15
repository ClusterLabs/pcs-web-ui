import type {RouteResponse} from "../mock";

import {libCluster} from "./libCluster";

export const resourceEnable = ({
  clusterName,
  resourceOrTagIds,
  response,
}: {
  clusterName: string;
  resourceOrTagIds: string[];
  response?: RouteResponse;
}) =>
  libCluster({
    clusterName,
    name: "resource-enable",
    payload: {
      resource_or_tag_ids: resourceOrTagIds,
    },
    response,
  });
