import {
  Divider,
  Flex,
  FlexItem,
  type FlexProps,
  PageSection,
} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {Card, ClusterToolbar} from "app/view/share";
import {useOpenTask} from "app/view/task";
import {useLoadedCluster} from "app/view/cluster/share";

import {IssuesCard} from "./issues";
import {NodesCard} from "./nodes";
import {ResourcesCard} from "./resources";

const grow: FlexProps["grow"] = {default: "grow"};

const {overview, overviewToolbar} = testMarks.cluster;

export const ClusterOverviewPage = () => {
  const openTask = useOpenTask();
  const cluster = useLoadedCluster();
  return (
    <>
      <ClusterToolbar
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
            run: () =>
              openTask("clusterStop", {
                type: "CLUSTER.STOP.INIT",
                payload: {clusterName: cluster.name},
              }),
            ...overviewToolbar.stopCluster.mark,
          },
        ]}
        {...overviewToolbar.mark}
      />

      <PageSection {...testMarks.cluster.mark}>
        <Card>
          <Flex {...overview.mark}>
            {cluster.issueList.length > 0 && (
              <>
                <FlexItem grow={grow}>
                  <IssuesCard issueList={cluster.issueList} />
                </FlexItem>

                <Divider
                  orientation={{
                    default: "horizontal",
                    "2xl": "vertical",
                    xl: "vertical",
                    lg: "vertical",
                    md: "horizontal",
                    sm: "horizontal",
                  }}
                />
              </>
            )}

            <FlexItem grow={grow}>
              <Card title="Nodes" isPlain>
                <NodesCard nodeList={cluster.nodeList} />
              </Card>
            </FlexItem>

            <Divider
              orientation={{
                // Divider orientations thresholds are different because the
                // second must go horizontal earlier than the first.
                default: "horizontal",
                "2xl": "vertical",
                xl: "horizontal",
                lg: "horizontal",
                md: "horizontal",
                sm: "horizontal",
              }}
            />

            <FlexItem grow={grow}>
              <Card title="Resources" isPlain>
                <ResourcesCard resourceTree={cluster.resourceTree} />
              </Card>
            </FlexItem>
          </Flex>
        </Card>
      </PageSection>
    </>
  );
};
