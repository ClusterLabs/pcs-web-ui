import {ActionPayload} from "app/store";
import {LauncherDropdown, TaskOpenArgs} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share/LoadedClusterContext";

import * as task from "./task";

type LauncherItem = React.ComponentProps<
  typeof LauncherDropdown
>["items"][number];

export const NVPairListItemMenu = ({
  owner,
  itemName,
  itemValue,
  nvPairNameList,
  launcherEdit,
  launcherRemove,
}: {
  owner: ActionPayload["CLUSTER.NVPAIRS.SAVE"]["owner"];
  itemName: string;
  itemValue: string;
  nvPairNameList: string[];
  launcherEdit: (editData: LauncherItem) => LauncherItem;
  launcherRemove: (removeData: LauncherItem) => LauncherItem;
}) => {
  const {name: taskName} = task.edit.useTask();
  const {clusterName} = useLoadedCluster();
  const editOpenArgs: TaskOpenArgs<typeof task.edit.useTask> = [
    {
      type: "update",
      owner,
      name: itemName,
      value: itemValue,
      nameList: nvPairNameList,
    },
  ];
  return (
    <LauncherDropdown
      items={[
        launcherEdit({
          name: "edit",
          task: {
            component: task.edit.Task,
            useTask: task.edit.useTask,
            openArgs: editOpenArgs,
          },
        }),
        launcherRemove({
          name: "remove",
          confirm: {
            title: `Remove the attribute "${itemName}"?`,
            description: "Removes the attribute.",
            action: {
              type: "CLUSTER.NVPAIRS.SAVE",
              key: {clusterName, task: taskName},
              payload: {
                owner,
                name: itemName,
                value: "",
              },
            },
          },
        }),
      ]}
    />
  );
};
