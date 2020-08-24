import React from "react";
import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Text,
  TextContent,
} from "@patternfly/react-core";

import { types } from "app/store";

import { ResourceCreateReports } from "./ResourceCreateReports";

export const ResourceCreateReview: React.FC<{
  wizardState: types.wizardResourceCreate.WizardResourceCreate;
}> = ({ wizardState: { agentName, resourceName } }) => {
  return (
    <>
      <TextContent>
        <Text component="h2">Review new resource configuration</Text>
      </TextContent>
      <DescriptionList isHorizontal>
        <DescriptionListGroup>
          <DescriptionListTerm>Resource name</DescriptionListTerm>
          <DescriptionListDescription>
            {resourceName}
          </DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>Resource type</DescriptionListTerm>
          <DescriptionListDescription>{agentName}</DescriptionListDescription>
        </DescriptionListGroup>
      </DescriptionList>
      <ResourceCreateReports />
    </>
  );
};
