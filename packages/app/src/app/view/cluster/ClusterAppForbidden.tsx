import {PageSection} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {EmptyStateError} from "app/view/share";

export const ClusterAppForbidden = () => {
  return (
    <PageSection {...testMarks.cluster.forbiden.mark}>
      <EmptyStateError
        title="Forbidden"
        message="You don't have a read permission for this cluster."
      />
    </PageSection>
  );
};
