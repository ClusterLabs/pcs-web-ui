import type {RouteResponse} from "../mock";

import {libCluster} from "./libCluster";

export const resourceEnable = ({
  resourceOrTagIds,
  response,
}: {
  resourceOrTagIds: string[];
  response?: RouteResponse;
}) =>
  libCluster({
    name: "resource-enable",
    payload: {
      resource_or_tag_ids: resourceOrTagIds,
    },
    response,
  });
