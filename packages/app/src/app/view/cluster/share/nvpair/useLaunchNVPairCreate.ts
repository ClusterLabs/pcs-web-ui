import {ActionPayload} from "app/store";
import {
  TaskOpenArgs,
  useLauncherDisableClusterNotRunning,
} from "app/view/share";

import * as task from "./task";

export const useLaunchNVPairCreate = ({
  nameList,
  createLabel,
  owner,
}: {
  nameList: string[];
  createLabel: string;
  owner: ActionPayload["CLUSTER.NVPAIRS.EDIT"]["owner"];
}) => {
  const launchDisable = useLauncherDisableClusterNotRunning();
  const editOpenArgs: TaskOpenArgs<typeof task.edit.useTask> = [
    {
      type: "create",
      owner,
      nameList,
    },
  ];
  return {
    name: "create",
    label: createLabel,
    task: {
      component: task.edit.Task,
      useTask: task.edit.useTask,
      openArgs: editOpenArgs,
    },
    launchDisable: launchDisable("Cannot create attribute on stopped cluster"),
  };
};
