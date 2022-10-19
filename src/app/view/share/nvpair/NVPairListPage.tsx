import * as React from "react";
import { StackItem } from "@patternfly/react-core";

import { ActionPayload } from "app/store";
import { NVPair } from "app/view/cluster/types";
import { LaunchersToolbar } from "app/view/share/toolbar";
import { TaskOpenArgs } from "app/view/share/task";
import { useLauncherDisableClusterNotRunning } from "app/view/share/toolbar/useLauncherDisableClusterNotRunning";

import { NVPairListView } from "./NVPairListView";
import * as task from "./task";

export const NVPairListPage = ({
  nvPairList,
  owner,
  createLabel,
  beforeList,
}: {
  nvPairList: NVPair[];
  owner: ActionPayload["CLUSTER.NVPAIRS.EDIT"]["owner"];
  createLabel: string;
  beforeList?: React.ReactNode;
}) => {
  const launchDisable = useLauncherDisableClusterNotRunning();
  const editOpenArgs: TaskOpenArgs<typeof task.edit.useTask> = [
    {
      type: "create",
      owner,
      nameList: nvPairList.map(nvPair => nvPair.name),
    },
  ];
  return (
    <>
      <StackItem>
        <LaunchersToolbar
          toolbarName="nvpairs"
          buttonsItems={[
            {
              name: "create",
              label: createLabel,
              task: {
                component: task.edit.Task,
                useTask: task.edit.useTask,
                openArgs: editOpenArgs,
              },
              launchDisable: launchDisable(
                "Cannot create attribute on stopped cluster",
              ),
            },
          ]}
        />
      </StackItem>

      {beforeList && <StackItem>{beforeList}</StackItem>}

      <StackItem>
        <NVPairListView nvPairList={nvPairList} owner={owner} />
      </StackItem>
    </>
  );
};
