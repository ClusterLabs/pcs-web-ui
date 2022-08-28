import {
  DetailLayoutToolbar,
  DetailLayoutToolbarAction,
  useSelectedClusterName,
} from "app/view/share";

export const AclDetailPageToolbar = () => {
  const clusterName = useSelectedClusterName();

  // NEED TO BE CHANGED - JUST EXAMPLE OF ACTIONS

  const edit: DetailLayoutToolbarAction = {
    action: {
      type: "NODE.START",
      key: { clusterName },
      payload: { nodeName: "nodename" },
    },
    confirm: {
      title: "Start node?",
      description: "Start a cluster on the node",
    },
  };

  const remove: DetailLayoutToolbarAction = {
    action: {
      type: "LIB.CALL.CLUSTER",
      key: { clusterName },
      payload: {
        taskLabel: `remove role "${clusterName}"`,
        call: {
          name: "acl-remove-role",
          payload: { role_id: "" },
        },
      },
    },
    confirm: {
      title: "Remove role?",
      description: <>This removes the role</>,
    },
  };

  return (
    <DetailLayoutToolbar
      toolbarName="role"
      buttonActions={{
        edit,
        remove,
      }}
    />
  );
};
