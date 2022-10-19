import { useSelectedClusterName } from "app/view/share/SelectedClusterContext";
import { LauncherActionList } from "app/view/share/toolbar";

export const ClusterStoppedInfo = () => {
  const clusterName = useSelectedClusterName();
  return (
    <>
      <div>Cluster is stopped. You can start cluster on detail tab.</div>
      <div>
        <LauncherActionList
          name="stopped-cluster-actions"
          items={[
            {
              name: "start cluster",
              confirm: {
                title: "Start cluster?",
                description: "Start the on all nodes",
                action: {
                  type: "DASHBOARD.CLUSTER.START",
                  payload: { clusterName },
                },
              },
            },
          ]}
        />
      </div>
    </>
  );
};
