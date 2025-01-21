import type React from "react";
import {PageSection} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {EmptyStateSpinner} from "app/view/share";

export const ClusterAppLoading = ({
  title,
}: {
  title: React.ComponentProps<typeof EmptyStateSpinner>["title"];
}) => {
  return (
    <PageSection {...testMarks.cluster.mark}>
      <EmptyStateSpinner title={title} {...testMarks.cluster.loading.mark} />
    </PageSection>
  );
};
