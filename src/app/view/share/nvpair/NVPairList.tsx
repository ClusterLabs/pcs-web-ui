import { ActionPayload } from "app/store";
import { useSelectedClusterName } from "app/view/share/SelectedClusterContext";
import {
  DropdownActionListMenu,
  ModalAction,
} from "app/view/share/DropdownActionListMenu";
import { NVPair } from "app/view/cluster/types";
import { Table } from "app/view/share/table";

import * as task from "./task";

export const NVPairList = ({
  nvPairList,
  owner,
}: {
  nvPairList: NVPair[];
  owner: ActionPayload["CLUSTER.NVPAIRS.SAVE"]["owner"];
}) => {
  const { open, name: taskName } = task.edit.useTask();
  const clusterName = useSelectedClusterName();

  const edit = (attrName: string, attrValue: string): ModalAction => ({
    onClick: () =>
      open({
        type: "update",
        owner,
        name: attrName,
        value: attrValue,
        nameList: nvPairList.map(nvPair => nvPair.name),
      }),
  });

  const remove = (attrName: string): ModalAction => ({
    confirm: {
      title: `Remove the attribute "${attrName}"?`,
      description: "Removes the attribute.",
    },
    action: {
      type: "CLUSTER.NVPAIRS.SAVE",
      key: { clusterName, task: taskName },
      payload: {
        owner,
        name: attrName,
        value: "",
      },
    },
  });

  return (
    <Table>
      <Table.Body data-test="nvpair-list">
        {nvPairList.map(nvPair => (
          <tr key={nvPair.id} data-test={`nvpair ${nvPair.id}`}>
            <td data-label="name" data-test="name">
              {nvPair.name}
            </td>
            <td data-label="value" data-test="value">
              {nvPair.value}
            </td>
            <td data-label="Menu">
              <DropdownActionListMenu
                dropdownActions={{
                  edit: edit(nvPair.name, nvPair.value),
                  remove: remove(nvPair.name),
                }}
              />
            </td>
          </tr>
        ))}
      </Table.Body>
    </Table>
  );
};
