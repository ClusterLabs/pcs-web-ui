import React from "react";
import {PageSection} from "@patternfly/react-core";

import {EmptyStateSpinner} from "app/view/share/emptyState";

export const PageSectionSpinner = ({
  title,
}: {
  title: React.ComponentProps<typeof EmptyStateSpinner>["title"];
}) => {
  return (
    <PageSection>
      <EmptyStateSpinner title={title} />
    </PageSection>
  );
};
