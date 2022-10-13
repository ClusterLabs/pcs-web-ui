import {
  Card,
  CardBody,
  CardHeader,
  PageSection,
  Stack,
  StackItem,
} from "@patternfly/react-core";

import { selectors } from "app/store";
import {
  ClusterToolbar,
  useClusterSelector,
  useSelectedClusterName,
} from "app/view/share";

import { ClusterIssueList } from "./issues";

export const ClusterDetail = () => {
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
              description: "Start a cluster on all nodes",
              action: {
                type: "DASHBOARD.CLUSTER.START",
                payload: { clusterName },
              },
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
