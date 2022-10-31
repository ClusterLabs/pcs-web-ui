import {
  Card,
  CardBody,
  CardHeader,
  PageSection,
  Stack,
  StackItem,
} from "@patternfly/react-core";

import {selectors} from "app/store";
import {
  ClusterToolbar,
  task,
  useClusterSelector,
  useSelectedClusterName,
} from "app/view/share";

import {ClusterIssueList} from "./issues";

export const ClusterDetailPage = () => {
  const [cluster] = useClusterSelector(selectors.getCluster);
  const clusterName = useSelectedClusterName();
  return (
    <>
      <ClusterToolbar
        toolbarName="cluster-detail"
        buttonsItems={[
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
                  description: "Stop the cluster on all nodes",
                },
                runLabel: "Stop",
                processTitle: {
                  wait: "Stopping cluster",
                  success: "Cluster was successfully stopped",
                  fail: "Cluster stop failed",
                },
                getForceableAction: ({force}) => ({
                  type: "DASHBOARD.CLUSTER.STOP",
                  payload: {clusterName, force},
                }),
              }),
              useTask: task.forceableConfirm.useTask,
            },
          },
        ]}
      />

      <PageSection data-test="cluster-detail">
        <Card>
          <CardHeader>
            <span>
              Cluster <strong>{cluster.name}</strong>
            </span>
          </CardHeader>
          <CardBody>
            <Stack hasGutter className="pf-u-m-md">
              <StackItem>
                <ClusterIssueList issueList={cluster.issueList} />
              </StackItem>
            </Stack>
          </CardBody>
        </Card>
      </PageSection>
    </>
  );
};
