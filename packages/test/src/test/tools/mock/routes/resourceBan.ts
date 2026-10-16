import type {RouteResponse} from "../mock";

import {libCluster} from "./libCluster";

export const resourceBan = ({
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
    name: "resource-ban",
    payload: {
      resource_id: resourceId,
      node,
      master,
      lifetime,
    },
    response,
  });
