import { Action, ActionPayload } from "app/store";
import { useSelectedClusterName } from "app/view/share/SelectedClusterContext";
import { DropdownActionListMenu } from "app/view/share/DropdownActionListMenu";
import { ModalAction } from "app/view/share/DropdownActionListMenu";
import { NVPair } from "app/view/cluster/types";

import * as task from "./task";

export const NVPairMenu = ({
  attr,
  owner,
}: {
  attr: NVPair;
  owner: ActionPayload["CLUSTER.NVPAIRS.SAVE"]["owner"];
}) => {
  const { open } = task.edit.useTask();
  const clusterName = useSelectedClusterName();

  const removeAction: Action = {
    type: "CLUSTER.NVPAIRS.SAVE",
    key: { clusterName, task: "nvpairEdit" },
    payload: {
      owner,
      name: attr.name,
      value: "",
    },
  };

  const edit: ModalAction = {
    onClick: () =>
      open({
        type: "update",
        owner,
        name: attr.name,
        value: attr.value,
      }),
  };

  const remove: ModalAction = {
    confirm: {
      title: `Remove the attribute "${attr.name}"?`,
      description: "Removes the attribute.",
    },
    action: removeAction,
  };

  return (
    <>
      <DropdownActionListMenu
        dropdownActions={{
          edit,
          remove,
        }}
      />
    </>
  );
};
