import type {RouteResponse} from "../mock";

import {libCluster} from "./libCluster";

export const resourceMoveAutoclean = ({
  resourceId,
  node,
  master,
  strict,
  response,
}: {
  resourceId: string;
  node?: string;
  master?: boolean;
  strict?: boolean;
  response?: RouteResponse;
}) =>
  libCluster({
    name: "resource-move-autoclean",
    payload: {
      resource_id: resourceId,
      node,
      master,
      strict,
    },
    response,
  });
