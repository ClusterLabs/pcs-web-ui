import type {RouteResponse} from "../mock";

import {libCluster} from "./libCluster";

export const resourceMove = ({
  clusterName,
  resourceId,
  node,
  master,
  lifetime,
  response,
}: {
  clusterName: string;
  resourceId: string;
  node?: string;
  master?: boolean;
  lifetime?: string;
  response?: RouteResponse;
}) =>
  libCluster({
    clusterName,
    name: "resource-move",
    payload: {
      resource_id: resourceId,
      node,
      master,
      lifetime,
    },
    response,
  });
