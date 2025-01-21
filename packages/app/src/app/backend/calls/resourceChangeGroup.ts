import {type CallResult, endpoints, http} from "./tools";

const {url, params} = endpoints.resourceChangeGroup;

export const resourceChangeGroup = async ({
  clusterName,
  resourceId,
  groupId,
  oldGroupId,
  position,
  adjacentResourceId,
}: {
  clusterName: string;
} & Parameters<typeof params>[0]): CallResult =>
  http.post(url({clusterName}), {
    params: params({
      resourceId,
      groupId,
      oldGroupId,
      position,
      adjacentResourceId,
    }),
  });
