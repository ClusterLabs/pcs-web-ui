import {Flex, FlexItem, FlexProps, PageSection} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {Card, ClusterToolbar, task} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";

import {IssuesCard} from "./issues";
import {NodesCard} from "./nodes";
import {ResourcesCard} from "./resources";

const grow: FlexProps["grow"] = {default: "grow"};

const {overview, overviewToolbar} = testMarks.cluster;

export const ClusterOverviewPage = () => {
  const cluster = useLoadedCluster();
  return (
    <>
      <ClusterToolbar
        toolbarName="cluster-overview"
        buttonsItems={[
          {
            name: "start",
            confirm: {
              title: "Start cluster?",
              description: "Start the cluster on all nodes",
              action: {
                type: "DASHBOARD.CLUSTER.START",
                payload: {clusterName: cluster.name},
              },
            },
            ...overviewToolbar.startCluster.mark,
          },
          {
            name: "stop",
            task: {
              component: task.forceableConfirm.Task({
                runLabel: "Stop",
                taskLabel: "Stop cluster",
                description: "Stop the cluster on all nodes",
                getForceableAction: ({force}) => ({
                  type: "DASHBOARD.CLUSTER.STOP",
                  payload: {clusterName: cluster.name, force},
                }),
                "data-test": "cluster-stop",
              }),
              useTask: task.forceableConfirm.useTask,
            },
            ...overviewToolbar.stopCluster.mark,
          },
        ]}
        {...overviewToolbar.mark}
      />

      <PageSection {...testMarks.cluster.mark}>
        <Flex {...overview.mark}>
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
          <FlexItem grow={grow} className="pf-u-m-0">
            <Card title="Resources">
              <ResourcesCard resourceTree={cluster.resourceTree} />
            </Card>
          </FlexItem>
        </Flex>
      </PageSection>
    </>
  );
};
