import {Label} from "@patternfly/react-core";

import {LauncherActionList} from "app/view/share/toolbar";

export const ClusterStoppedInfo = ({
  clusterName,
  startButton,
}: {
  clusterName: string;
  startButton?: "button" | "link";
}) => {
  return (
    <>
      <div>Cluster is stopped. You can start cluster on detail tab.</div>
      {startButton && (
        <div>
          <LauncherActionList
            items={[
              {
                name: "start cluster",
                confirm: {
                  title: "Start the cluster?",
                  description: (
                    <span>
                      Start the cluster{" "}
                      <Label color="blue">{clusterName}</Label> on all nodes
                    </span>
                  ),
                  action: {
                    type: "DASHBOARD.CLUSTER.START",
                    payload: {clusterName},
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
