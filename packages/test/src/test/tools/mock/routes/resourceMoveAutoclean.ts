import {RouteResponse} from "../mock";

import {libCluster} from "./libCluster";

export const resourceMoveAutoclean = ({
  clusterName,
  resourceId,
  node,
  master,
  strict,
  response,
}: {
  clusterName: string;
  resourceId: string;
  node?: string;
  master?: boolean;
  strict?: boolean;
  response?: RouteResponse;
}) =>
  libCluster({
    clusterName,
    name: "resource-move-autoclean",
    payload: {
      resource_id: resourceId,
      node,
      master,
      strict,
    },
    response,
  });
