import {PageSection, EmptyState, EmptyStateBody} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";

export const ClusterAppNoClusterOnBackend = () => {
  return (
    <PageSection {...testMarks.cluster.mark}>
      <EmptyState
        style={{margin: "auto"}}
        titleText="No cluster."
        headingLevel="h1"
      >
        <EmptyStateBody>This host is not in a cluster.</EmptyStateBody>
      </EmptyState>
    </PageSection>
  );
};
