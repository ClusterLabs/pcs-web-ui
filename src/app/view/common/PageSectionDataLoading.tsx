import React from "react";
import {
  EmptyState,
  EmptyStateIcon,
  PageSection,
  Spinner,
  Title,
} from "@patternfly/react-core";

export const PageSectionDataLoading = (
  { done, children, ...rest }: React.PropsWithChildren<
    React.ComponentProps<typeof PageSection> & { done: boolean }
  >,
) => (
  /* eslint-disable react/jsx-props-no-spreading */
  <PageSection {...rest}>
    {
      done
        ? children
        : (
          <EmptyState style={{ margin: "auto" }}>
            <EmptyStateIcon variant="container" component={Spinner} />
            <Title size="lg">Loading data</Title>
          </EmptyState>
        )
    }
  </PageSection>
);
