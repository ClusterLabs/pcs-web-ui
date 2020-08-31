import React from "react";
import { Stack, StackItem, Text, TextContent } from "@patternfly/react-core";

import { types } from "app/backend";

import { WizardLibReports } from "./WizardLibReports";

export const WizardLibStep: React.FC<{
  title: string;
  reports?: types.libraryResponse.ApiReport[];
}> = ({ title, children, reports = [] }) => {
  return (
    <Stack hasGutter>
      <StackItem>
        <TextContent>
          <Text component="h2">{title}</Text>
        </TextContent>
      </StackItem>
      <StackItem>{children}</StackItem>
      <StackItem>
        <WizardLibReports reports={reports} />
      </StackItem>
    </Stack>
  );
};
