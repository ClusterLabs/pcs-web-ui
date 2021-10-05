import React from "react";

import { Action } from "app/store";
import { DropdownActionListMenu, ModalAction } from "app/view/share";

export const DashboardClusterMenu: React.FC<{ clusterName: string }> = ({
  clusterName,
}) => {
  const removeAction: Action = {
    type: "DASHBOARD.CLUSTER.REMOVE",
    payload: { clusterName },
  };

  const destroyAction: Action = {
    type: "DASHBOARD.CLUSTER.DESTROY",
    payload: { clusterName },
  };

  const remove: ModalAction = {
    confirm: {
      title: `Remove the cluster "${clusterName}"?`,
      description:
        "This only removes the cluster from the Web UI, it does not stop the cluster from running.",
    },
    action: removeAction,
  };

  const destroy: ModalAction = {
    confirm: {
      title: `Destroy the cluster "${clusterName}"?`,
      description:
        "The cluster will be stopped and all its configuration files will be deleted. This action cannot be undone.",
    },
    action: destroyAction,
  };

  return (
    <>
      <DropdownActionListMenu
        dropdownActions={{
          remove,
          destroy,
        }}
      />
    </>
  );
};
