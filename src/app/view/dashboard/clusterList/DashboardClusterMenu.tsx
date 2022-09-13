import { LauncherDropdown, LauncherItem } from "app/view/share";

export const DashboardClusterMenu = ({
  clusterName,
}: {
  clusterName: string;
}) => {
  const remove: LauncherItem = {
    name: "remove",
    confirm: {
      title: `Remove the cluster "${clusterName}"?`,
      description: (
        <>
          This only removes the cluster from the Web UI, it does not stop the
          cluster from running.
        </>
      ),
      action: {
        type: "DASHBOARD.CLUSTER.REMOVE",
        payload: { clusterName },
      },
    },
  };

  const destroy: LauncherItem = {
    name: "destroy",
    confirm: {
      title: `Destroy the cluster "${clusterName}"?`,
      description: (
        <>
          The cluster will be stopped and all its configuration files will be
          deleted. This action cannot be undone.
        </>
      ),
      action: {
        type: "DASHBOARD.CLUSTER.DESTROY",
        payload: { clusterName },
      },
    },
  };

  return <LauncherDropdown dropdownName="cluster" items={[remove, destroy]} />;
};
