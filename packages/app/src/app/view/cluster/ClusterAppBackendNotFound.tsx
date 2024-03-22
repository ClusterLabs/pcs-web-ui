import {PageSection} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {EmptyStateBackendNotFound} from "app/view/share";

export const ClusterAppBackendNotFound = () => {
  return (
    <PageSection {...testMarks.cluster.mark}>
      <EmptyStateBackendNotFound />
    </PageSection>
  );
};
