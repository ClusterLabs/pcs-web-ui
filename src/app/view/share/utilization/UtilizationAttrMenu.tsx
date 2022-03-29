import { Action, ActionPayload } from "app/store";
import { useSelectedClusterName } from "app/view/share/SelectedClusterContext";
import { DropdownActionListMenu } from "app/view/share/DropdownActionListMenu";
import { ModalAction } from "app/view/share/DropdownActionListMenu";
import { NVPair } from "app/view/cluster/types";

import * as task from "./task";

export const UtilizationAttrMenu = ({
  attr,
  owner,
}: {
  attr: NVPair;
  owner: ActionPayload["CLUSTER.UTILIZATION.SAVE"]["owner"];
}) => {
  const { open } = task.edit.useTask();
  const clusterName = useSelectedClusterName();

  const removeAction: Action = {
    type: "CLUSTER.UTILIZATION.SAVE",
    key: { clusterName, task: "utilizationEdit" },
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
      title: `Remove the utilization attribute "${attr.name}"?`,
      description: "Removes the utilization attribute.",
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
