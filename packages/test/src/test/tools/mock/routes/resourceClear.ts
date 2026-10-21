import type {RouteResponse} from "../mock";

import {libCluster} from "./libCluster";

export const resourceClear = ({
  resourceId,
  node,
  master,
  expired,
  response,
}: {
  resourceId: string;
  node?: string;
  master?: boolean;
  expired?: boolean;
  response?: RouteResponse;
}) =>
  libCluster({
    name: "resource-unmove-unban",
    payload: {
      resource_id: resourceId,
      node,
      master,
      expired,
    },
    response,
  });
