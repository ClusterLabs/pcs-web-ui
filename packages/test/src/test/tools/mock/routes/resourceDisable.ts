import type {RouteResponse} from "../mock";

import {libCluster} from "./libCluster";

export const resourceDisable = ({
  resourceOrTagIds,
  response,
  force,
}: {
  resourceOrTagIds: string[];
  response?: RouteResponse;
  force?: boolean;
}) =>
  libCluster({
    name: "resource-disable",
    payload: {
      resource_or_tag_ids: resourceOrTagIds,
      ...(force ? {force_flags: ["FORCE"]} : {}),
    },
    response,
  });
