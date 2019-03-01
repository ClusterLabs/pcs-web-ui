import React from "react";
import { PageSection } from "@patternfly/react-core";

import Spinner from "./Spinner";

const PageSectionDataLoading = ({ done, children, ...rest }) => (
  <PageSection {...rest}>
    {
      done
        ? children
        : <Spinner text="Loading data" />
    }
  </PageSection>
);

export default PageSectionDataLoading;
