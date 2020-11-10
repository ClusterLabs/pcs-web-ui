import React from "react";
import { PageSection } from "@patternfly/react-core";

import { EmptyStateSpinner } from "app/view/emptyState";

export const PageSectionDataLoading = ({
  done,
  children,
  ...rest
}: React.PropsWithChildren<
  React.ComponentProps<typeof PageSection> & { done: boolean }
>) => (
  /* eslint-disable react/jsx-props-no-spreading */
  <PageSection {...rest}>
    {done ? children : <EmptyStateSpinner title="Loading data" />}
  </PageSection>
);
