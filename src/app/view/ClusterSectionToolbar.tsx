import React from "react";
import { PageSection, Stack, StackItem } from "@patternfly/react-core";

export const ClusterSectionToolbar = ({
  children,
}: React.PropsWithChildren<{}>) => {
  return (
    <PageSection variant="light" style={{ paddingTop: "0" }}>
      <Stack>
        <StackItem>{children}</StackItem>
      </Stack>
    </PageSection>
  );
};
