import {LauncherDropdown, task} from "app/view/share";

export const DashboardClusterMenu = ({clusterName}: {clusterName: string}) => {
  const clusterLabel = <strong>{clusterName}</strong>;
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
              payload: {clusterName},
            },
          },
        },
        {
          name: "stop",
          task: {
            component: task.forceableConfirm.Task({
              confirm: {
                title: "Stop cluster?",
                description: <>Stop the cluster {clusterLabel} on all nodes</>,
              },
              runLabel: "Stop",
              processTitle: {
                wait: <>Stopping cluster {clusterLabel}</>,
                success: <>Cluster {clusterLabel} was successfully stopped</>,
                fail: <>Failed to stop cluster {clusterLabel}</>,
              },
              getForceableAction: ({force}) => ({
                type: "DASHBOARD.CLUSTER.STOP",
                payload: {clusterName, force},
              }),
              "data-test": "cluster-stop",
            }),
            useTask: task.forceableConfirm.useTask,
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
              payload: {clusterName},
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
              payload: {clusterName},
            },
          },
        },
      ]}
    />
  );
};
