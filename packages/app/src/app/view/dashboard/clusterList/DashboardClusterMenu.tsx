import {LauncherDropdown, task} from "app/view/share";
import {testMarks} from "app/view/dataTest";

const {actions} = testMarks.dashboard.clusterList.cluster.loaded;

export const DashboardClusterMenu = ({clusterName}: {clusterName: string}) => {
  const clusterLabel = <strong>{clusterName}</strong>;
  return (
    <LauncherDropdown
      {...actions.mark}
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
          ...actions.start.mark,
        },
        {
          name: "stop",
          task: {
            component: task.forceableConfirm.Task({
              runLabel: "Stop",
              taskLabel: `Stop cluster ${clusterLabel}`,
              description: <>Stop the cluster {clusterLabel} on all nodes</>,
              getForceableAction: ({force}) => ({
                type: "DASHBOARD.CLUSTER.STOP",
                payload: {clusterName, force},
              }),
            }),
            useTask: task.forceableConfirm.useTask,
          },
          ...actions.stop.mark,
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
            runMark: actions.remove.confirm.run.mark,
            cancelMark: actions.remove.confirm.cancel.mark,
            ...actions.remove.confirm.mark,
          },
          ...actions.remove.mark,
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
          ...actions.destroy.mark,
        },
      ]}
    />
  );
};
