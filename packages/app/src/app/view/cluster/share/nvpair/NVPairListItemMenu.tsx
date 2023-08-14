import {LauncherDropdown, TaskOpenArgs} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share/LoadedClusterContext";

import * as task from "./task";
import {useNVPairListContext} from "./NVPairListContext";
import {useNVPairListItemContext} from "./NVPairListItemContext";

type Launcher = React.ComponentProps<typeof LauncherDropdown>["items"][number];

export const NVPairListItemMenu = ({
  launcherEdit,
  launcherRemove,
}: {
  launcherEdit: (editData: Launcher) => Launcher;
  launcherRemove: (removeData: Launcher) => Launcher;
}) => {
  const {name: taskName} = task.edit.useTask();
  const {clusterName} = useLoadedCluster();
  const {nvPairList, owner} = useNVPairListContext();
  const nvPair = useNVPairListItemContext();
  const editOpenArgs: TaskOpenArgs<typeof task.edit.useTask> = [
    {
      type: "update",
      owner,
      name: nvPair.name,
      value: nvPair.value,
      nameList: nvPairList.map(pair => pair.name),
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
            title: `Remove the attribute "${nvPair.name}"?`,
            description: "Removes the attribute.",
            action: {
              type: "CLUSTER.NVPAIRS.SAVE",
              key: {clusterName, task: taskName},
              payload: {
                owner,
                name: nvPair.name,
                value: "",
              },
            },
          },
        }),
      ]}
    />
  );
};
