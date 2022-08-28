import {
  DetailLayoutToolbar,
  DetailLayoutToolbarAction,
  useSelectedClusterName,
} from "app/view/share";

export const AclGroupDetailPageToolbar = () => {
  const clusterName = useSelectedClusterName();

  // NEED TO BE CHANGED - JUST EXAMPLE OF ACTIONS

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
        remove,
      }}
    />
  );
};
