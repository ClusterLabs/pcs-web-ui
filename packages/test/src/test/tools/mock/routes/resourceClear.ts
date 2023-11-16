import {RouteResponse} from "../mock";

import {libCluster} from "./libCluster";

export const resourceClear = ({
  clusterName,
  resourceId,
  node,
  master,
  expired,
  response,
}: {
  clusterName: string;
  resourceId: string;
  node?: string;
  master?: boolean;
  expired?: boolean;
  response?: RouteResponse;
}) =>
  libCluster({
    clusterName,
    name: "resource-unmove_unban",
    payload: {
      resource_id: resourceId,
      node,
      master,
      expired,
    },
    response,
  });
