import {endpoints} from "app/backend/endpoints";

import {RouteResponse} from "test/tools/interception";

import {paramsToBody} from "./tools";

type Params = Parameters<typeof endpoints.resourceChangeGroup.params>[0];

export const resourceChangeGroup = ({
  clusterName,
  resourceId,
  groupId,
  oldGroupId,
  position,
  adjacentResourceId,
  response,
}: {
  clusterName: string;
  response?: RouteResponse;
} & Params) => {
  return {
    url: endpoints.resourceChangeGroup.url({clusterName}),
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
