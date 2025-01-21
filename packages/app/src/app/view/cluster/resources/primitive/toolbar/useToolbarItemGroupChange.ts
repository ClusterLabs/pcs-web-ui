import type {LauncherItem as ToolbarItem} from "app/view/share";
import type {Primitive} from "app/view/cluster/types";
import {useOpenTask} from "app/view/task";
import {selectGroups} from "app/view/cluster/resources/select";
import {useLoadedCluster} from "app/view/cluster/share";

export const useToolbarItemGroupChange = (
  primitive: Primitive,
): ToolbarItem => {
  const {resourceTree, clusterName} = useLoadedCluster();
  const openTask = useOpenTask();

  const groupIdStructureList = selectGroups(resourceTree);

  return {
    name: "change-group",
    run: () =>
      openTask("primitiveGroupChange", {
        type: "RESOURCE.GROUP.CHANGE.INIT",
        key: {clusterName},
        payload: {
          clusterName,
          groupIdStructureList,
          resourceId: primitive.id,
          oldGroupId: primitive.inGroup ?? "",
          groupId: primitive.inGroup ?? "",
          action:
            primitive.inGroup !== null && primitive.inGroup !== ""
              ? "move-in-group"
              : "set-group",
        },
      }),
    disabled: primitive.inGroup === null && groupIdStructureList.length === 0,
  };
};
