import React from "react";
import { PageSection } from "@patternfly/react-core";

import { Spinner } from "./Spinner";

export const PageSectionDataLoading = (
  { done, children, ...rest }: React.PropsWithChildren<
    React.ComponentProps<typeof PageSection> & { done: boolean }
  >,
) => (
  <PageSection {...rest}>
    {
      done
        ? children
        : <Spinner text="Loading data" />
    }
  </PageSection>
);
