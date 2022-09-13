import { Group } from "app/view/cluster/types";
import {
  DetailToolbar,
  LauncherItem as ToolbarItem,
  useSelectedClusterName,
} from "app/view/share";

export const GroupPageToolbar = ({ group }: { group: Group }) => {
  const cluster = useSelectedClusterName();
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
        key: { clusterName: cluster },
        payload: { resourceId: group.id },
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
        key: { clusterName: cluster },
        payload: { resourceId: group.id },
      },
    },
  };
  return (
    <DetailToolbar
      toolbarName="group"
      buttonsItems={[group.inClone ? unclone : clone]}
    />
  );
};
