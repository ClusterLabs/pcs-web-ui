import { endpoint } from "./endpoint";

export const resourceChangeGroup = endpoint({
  url: ({ clusterName }: { clusterName: string }) =>
    `/managec/${clusterName}/resource_change_group`,
  method: "post",
  params: ({
    resourceId,
    groupId,
    oldGroupId,
    position,
    adjacentResourceId,
  }: {
    resourceId: string;
    groupId: string;
    oldGroupId: string;
    position: "before" | "after";
    adjacentResourceId: string;
  }): [string, string][] => [
    ["resource_id", resourceId],
    ["group_id", groupId],
    ["old_group_id", oldGroupId],
    ["in_group_position", position],
    ["in_group_reference_resource_id", adjacentResourceId],
  ],
  shape: undefined,
});
