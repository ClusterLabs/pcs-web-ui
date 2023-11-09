import {Group} from "app/view/cluster/types";
import {useOpenTask} from "app/view/task";
import {LauncherItem as ToolbarItem} from "app/view/share";
import {DetailToolbar, useLoadedCluster} from "app/view/cluster/share";

export const GroupPageToolbar = ({group}: {group: Group}) => {
  const {clusterName} = useLoadedCluster();
  const openTask = useOpenTask();
  const unclone: ToolbarItem = {
    name: "unclone",
    confirm: {
      title: "Unclone resource?",
      description: (
        <>
          Remove the clone which contains the resource (the resource will not be
          removed).
        </>
      ),
      action: {
        type: "RESOURCE.UNCLONE",
        key: {clusterName},
        payload: {resourceId: group.id},
      },
    },
  };

  const clone: ToolbarItem = {
    name: "clone",
    confirm: {
      title: "Clone resource?",
      description: "Set up the specified resource or group as a clone.",
      action: {
        type: "RESOURCE.CLONE",
        key: {clusterName},
        payload: {resourceId: group.id},
      },
    },
  };
  return (
    <DetailToolbar
      buttonsItems={[
        group.inClone !== null ? unclone : clone,
        {
          name: "move",
          run: () =>
            openTask("resourceMove", {
              type: "RESOURCE.MOVE.OPEN",
              key: {clusterName},
              payload: {
                clusterName,
                resourceId: group.id,
              },
            }),
        },
      ]}
    />
  );
};
