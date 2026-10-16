import type {RouteResponse} from "../mock";

import {libCluster} from "./libCluster";

export const resourceMove = ({
  resourceId,
  node,
  master,
  lifetime,
  response,
}: {
  resourceId: string;
  node?: string;
  master?: boolean;
  lifetime?: string;
  response?: RouteResponse;
}) =>
  libCluster({
    name: "resource-move",
    payload: {
      resource_id: resourceId,
      node,
      master,
      lifetime,
    },
    response,
  });
