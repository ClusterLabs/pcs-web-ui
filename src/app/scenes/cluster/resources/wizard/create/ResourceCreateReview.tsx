import React from "react";
import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Text,
  TextContent,
} from "@patternfly/react-core";

import { selectors } from "app/store";
import { useClusterSelector } from "app/view";

export const ResourceCreateReview = () => {
  const [{ agentName, resourceName }] = useClusterSelector(
    selectors.getWizardResourceCreateState,
  );
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
    </>
  );
};
