import {
  Alert,
  Divider,
  Flex,
  FlexItem,
  type FlexProps,
  PageSection,
} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {Card, ClusterToolbar, LauncherDropdown} from "app/view/share";
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
              action: {type: "CLUSTER.START"},
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
        dropdown={
          <LauncherDropdown
            items={[
              {
                name: "setup-cluster",
                run: () => openTask("clusterSetup"),
                ...overviewToolbar.dropdown.setupCluster.mark,
              },
              {
                name: "destroy-cluster",
                confirm: {
                  title: "Destroy the cluster?",
                  titleVariant: "warning",
                  description: (
                    <>
                      <div className="pf-v6-u-mb-sm">
                        The cluster will be stopped and all its configuration
                        files will be deleted.
                      </div>
                      <Alert
                        title={
                          <>
                            This command permanently removes any cluster
                            configuration that has been created. This action
                            cannot be undone.
                          </>
                        }
                        isPlain
                        isInline
                        variant="warning"
                      />
                    </>
                  ),
                  action: {type: "CLUSTER.DESTROY"},
                },
                ...overviewToolbar.dropdown.destroyCluster.mark,
              },
            ]}
            {...overviewToolbar.dropdown.mark}
          />
        }
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
