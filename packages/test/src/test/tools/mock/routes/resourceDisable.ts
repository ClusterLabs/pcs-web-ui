import type {RouteResponse} from "../mock";

import {libCluster} from "./libCluster";

export const resourceDisable = ({
  clusterName,
  resourceOrTagIds,
  response,
  force,
}: {
  clusterName: string;
  resourceOrTagIds: string[];
  response?: RouteResponse;
  force?: boolean;
}) =>
  libCluster({
    clusterName,
    name: "resource-disable",
    payload: {
      resource_or_tag_ids: resourceOrTagIds,
      ...(force ? {force_flags: ["FORCE"]} : {}),
    },
    response,
  });
