import {
  Button,
  PageSection,
  EmptyState,
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateFooter,
} from "@patternfly/react-core";
import {useOpenTask} from "app/view/task";

import {testMarks} from "app/view/dataTest";

export const ClusterAppNoClusterOnBackend = () => {
  const openTask = useOpenTask();
  return (
    <PageSection {...testMarks.cluster.mark}>
      <EmptyState
        style={{margin: "auto"}}
        titleText="No cluster."
        headingLevel="h1"
        {...testMarks.cluster.noCluster.mark}
      >
        <EmptyStateBody>This host is not in a cluster.</EmptyStateBody>
        <EmptyStateFooter>
          <EmptyStateActions>
            <Button
              variant="primary"
              onClick={() => openTask("clusterSetup")}
              {...testMarks.cluster.noCluster.setupCluster.mark}
            >
              Setup Cluster
            </Button>
          </EmptyStateActions>
        </EmptyStateFooter>
      </EmptyState>
    </PageSection>
  );
};
