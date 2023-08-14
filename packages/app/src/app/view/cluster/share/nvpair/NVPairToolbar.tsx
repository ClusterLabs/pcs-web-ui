import {LaunchersToolbar} from "app/view/share";
import {
  TaskOpenArgs,
  useLauncherDisableClusterNotRunning,
} from "app/view/share";

import {useNVPairListContext} from "./NVPairListContext";
import * as task from "./task";

type Launcher = NonNullable<
  React.ComponentProps<typeof LaunchersToolbar>["buttonsItems"]
>[number];

export const NVPairToolbar = (props: {
  createLabel: string;
  launcherCreate: (createData: Launcher) => Launcher;
  "data-test"?: string;
}) => {
  const {owner, nvPairList} = useNVPairListContext();
  const launchDisable = useLauncherDisableClusterNotRunning();
  const editOpenArgs: TaskOpenArgs<typeof task.edit.useTask> = [
    {
      type: "create",
      owner,
      nameList: nvPairList.map(pair => pair.name),
    },
  ];
  return (
    <LaunchersToolbar
      toolbarName={owner.type}
      buttonsItems={[
        props.launcherCreate({
          name: "create",
          label: props.createLabel,
          task: {
            component: task.edit.Task,
            useTask: task.edit.useTask,
            openArgs: editOpenArgs,
          },
          launchDisable: launchDisable(
            "Cannot create attribute on stopped cluster",
          ),
        }),
      ]}
      data-test={props["data-test"]}
    />
  );
};
