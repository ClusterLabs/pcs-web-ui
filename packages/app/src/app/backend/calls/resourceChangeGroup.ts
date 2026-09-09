import {type CallResult, endpoints, http} from "./tools";

const {url, params} = endpoints.resourceChangeGroup;

export const resourceChangeGroup = async ({
  resourceId,
  groupId,
  oldGroupId,
  position,
  adjacentResourceId,
}: Parameters<typeof params>[0]): CallResult =>
  http.post(url, {
    params: params({
      resourceId,
      groupId,
      oldGroupId,
      position,
      adjacentResourceId,
    }),
  });
