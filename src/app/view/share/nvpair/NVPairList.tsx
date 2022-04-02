import { ActionPayload } from "app/store";
import { useSelectedClusterName } from "app/view/share/SelectedClusterContext";
import {
  DropdownActionListMenu,
  ModalAction,
} from "app/view/share/DropdownActionListMenu";
import { Table } from "app/view/share/table";
import { NVPair } from "app/view/cluster/types";

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
        {nvPairList.map(attr => (
          <tr key={attr.id} data-test={`nvpair ${attr.id}`}>
            <td data-label="name" data-test="name">
              {attr.name}
            </td>
            <td data-label="value" data-test="value">
              {attr.value}
            </td>
            <td data-label="Menu">
              <DropdownActionListMenu
                dropdownActions={{
                  edit: edit(attr.name, attr.value),
                  remove: remove(attr.name),
                }}
              />
            </td>
          </tr>
        ))}
      </Table.Body>
    </Table>
  );
};
