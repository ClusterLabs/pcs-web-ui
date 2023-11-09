import {Group} from "app/view/cluster/types";
import {LauncherItem as ToolbarItem} from "app/view/share";
import {DetailToolbar, useLoadedCluster} from "app/view/cluster/share";

import {useToolbarItemMove} from "./useToolbarItemMove";

export const GroupPageToolbar = ({group}: {group: Group}) => {
  const {clusterName} = useLoadedCluster();

  const move = useToolbarItemMove(group);

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
      buttonsItems={[group.inClone !== null ? unclone : clone, move]}
    />
  );
};
