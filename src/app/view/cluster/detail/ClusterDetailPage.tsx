import {Flex, FlexItem, FlexProps, PageSection} from "@patternfly/react-core";

import {selectors} from "app/store";
import {
  Card,
  ClusterToolbar,
  task,
  useClusterSelector,
  useSelectedClusterName,
} from "app/view/share";

import {IssuesCard} from "./issues";
import {NodesCard} from "./nodes";

const grow: FlexProps["grow"] = {default: "grow"};

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
        <Flex>
          {cluster.issueList.length > 0 && (
            <FlexItem grow={grow} className="pf-u-m-0">
              <IssuesCard issueList={cluster.issueList} />
            </FlexItem>
          )}
          <FlexItem grow={grow} className="pf-u-m-0">
            <Card title="Nodes">
              <NodesCard nodeList={cluster.nodeList} />
            </Card>
          </FlexItem>
        </Flex>
      </PageSection>
    </>
  );
};
