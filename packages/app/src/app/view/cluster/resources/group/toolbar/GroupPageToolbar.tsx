import {testMarks} from "app/view/dataTest";
import type {Group} from "app/view/cluster/types";
import {
  LauncherDropdown,
  type LauncherItem as ToolbarItem,
} from "app/view/share";
import {DetailToolbar, useLoadedCluster} from "app/view/cluster/share";
import {useOpenMoveBanTask} from "app/view/cluster/resources";

import {useToolbarItemMoveBan} from "./useToolbarItemMoveBan";

const {toolbar} = testMarks.cluster.resources.currentGroup;

export const GroupPageToolbar = ({group}: {group: Group}) => {
  const {clusterName} = useLoadedCluster();
  const openMoveBanTask = useOpenMoveBanTask();

  const move = useToolbarItemMoveBan(group, "move");
  const ban = useToolbarItemMoveBan(group, "ban");
  const clear = {
    name: "clear",
    run: () => openMoveBanTask("group", group.id, "clear"),
  };

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
          items={[
            {...ban, ...toolbar.dropdown.ban.mark},
            {...clear, ...toolbar.dropdown.clear.mark},
          ]}
          {...toolbar.dropdown.mark}
        />
      }
    />
  );
};
