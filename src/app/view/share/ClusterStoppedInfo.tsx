import { useSelectedClusterName } from "app/view/share/SelectedClusterContext";
import { LauncherActionList } from "app/view/share/toolbar";

export const ClusterStoppedInfo = ({
  startButton,
}: {
  startButton?: "button" | "link";
}) => {
  const clusterName = useSelectedClusterName();
  return (
    <>
      <div>Cluster is stopped. You can start cluster on detail tab.</div>
      {startButton && (
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
                button: {
                  variant: startButton === "button" ? "secondary" : "link",
                },
              },
            ]}
          />
        </div>
      )}
    </>
  );
};
