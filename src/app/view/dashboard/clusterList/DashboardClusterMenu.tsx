import { LauncherDropdown } from "app/view/share";

export const DashboardClusterMenu = ({
  clusterName,
}: {
  clusterName: string;
}) => {
  return (
    <LauncherDropdown
      dropdownName="cluster"
      items={[
        {
          name: "start",
          confirm: {
            title: "Start cluster?",
            description: "Start the on all nodes",
            action: {
              type: "DASHBOARD.CLUSTER.START",
              payload: { clusterName },
            },
          },
        },
        {
          name: "stop",
          confirm: {
            title: "Stop cluster?",
            description: "Stop the on all nodes",
            action: {
              type: "DASHBOARD.CLUSTER.STOP",
              payload: { clusterName, force: false },
            },
          },
        },
        {
          name: "remove",
          confirm: {
            title: `Remove the cluster "${clusterName}"?`,
            description: (
              <>
                This only removes the cluster from the Web UI, it does not stop
                the cluster from running.
              </>
            ),
            action: {
              type: "DASHBOARD.CLUSTER.REMOVE",
              payload: { clusterName },
            },
          },
        },
        {
          name: "destroy",
          confirm: {
            title: `Destroy the cluster "${clusterName}"?`,
            description: (
              <>
                The cluster will be stopped and all its configuration files will
                be deleted. This action cannot be undone.
              </>
            ),
            action: {
              type: "DASHBOARD.CLUSTER.DESTROY",
              payload: { clusterName },
            },
          },
        },
      ]}
    />
  );
};
