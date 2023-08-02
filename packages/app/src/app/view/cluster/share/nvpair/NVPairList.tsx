import {ActionPayload} from "app/store";
import {LauncherDropdown, Table, TaskOpenArgs} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share/LoadedClusterContext";
import {NVPair} from "app/view/cluster/types";

import * as task from "./task";

export const NVPairList = ({
  nvPairList,
  owner,
}: {
  nvPairList: NVPair[];
  owner: ActionPayload["CLUSTER.NVPAIRS.SAVE"]["owner"];
}) => {
  const {name: taskName} = task.edit.useTask();
  const {clusterName} = useLoadedCluster();

  return (
    <Table>
      <Table.Body data-test="nvpair-list">
        {nvPairList.map(nvPair => {
          const editOpenArgs: TaskOpenArgs<typeof task.edit.useTask> = [
            {
              type: "update",
              owner,
              name: nvPair.name,
              value: nvPair.value,
              nameList: nvPairList.map(nvPair => nvPair.name),
            },
          ];
          return (
            <tr key={nvPair.id} data-test={`nvpair ${nvPair.id}`}>
              <td data-label="name" data-test="name">
                {nvPair.name}
              </td>
              <td data-label="value" data-test="value">
                {nvPair.value}
              </td>
              <td data-label="Menu">
                <LauncherDropdown
                  items={[
                    {
                      name: "edit",
                      task: {
                        component: task.edit.Task,
                        useTask: task.edit.useTask,
                        openArgs: editOpenArgs,
                      },
                    },
                    {
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
                    },
                  ]}
                />
              </td>
            </tr>
          );
        })}
      </Table.Body>
    </Table>
  );
};
