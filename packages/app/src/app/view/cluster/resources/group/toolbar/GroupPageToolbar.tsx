import {testMarks} from "app/view/dataTest";
import {Group} from "app/view/cluster/types";
import {LauncherDropdown, LauncherItem as ToolbarItem} from "app/view/share";
import {DetailToolbar, useLoadedCluster} from "app/view/cluster/share";

import {useToolbarItemMoveBan} from "./useToolbarItemMoveBan";

const {toolbar} = testMarks.cluster.resources.currentGroup;

export const GroupPageToolbar = ({group}: {group: Group}) => {
  const {clusterName} = useLoadedCluster();

  const move = useToolbarItemMoveBan(group, "move");
  const ban = useToolbarItemMoveBan(group, "ban");

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
        {...move, ...toolbar.move.mark},
      ]}
      dropdown={
        <LauncherDropdown
          items={[{...ban, ...toolbar.dropdown.ban.mark}]}
          {...toolbar.dropdown.mark}
        />
      }
    />
  );
};
