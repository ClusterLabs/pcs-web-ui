import {endpoints} from "app/backend/endpoints";

import type {RouteResponse} from "../mock";

import {paramsToBody} from "./tools";

type Params = Parameters<typeof endpoints.resourceChangeGroup.params>[0];

export const resourceChangeGroup = ({
  resourceId,
  groupId,
  oldGroupId,
  position,
  adjacentResourceId,
  response,
}: {
  response?: RouteResponse;
} & Params) => {
  return {
    url: endpoints.resourceChangeGroup.url,
    body: paramsToBody(
      endpoints.resourceChangeGroup.params({
        resourceId,
        groupId,
        oldGroupId,
        position,
        adjacentResourceId,
      }),
    ),
    ...(response ?? {text: ""}),
  };
};
