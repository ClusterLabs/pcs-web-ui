import React from "react";
import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
} from "@patternfly/react-core";

import { types } from "app/store";

import { ResourceCreateStep } from "./ResourceCreateStep";

export const ResourceCreateReview: React.FC<{
  wizardState: types.wizardResourceCreate.WizardResourceCreate;
}> = ({ wizardState: { agentName, resourceName, instanceAttrs } }) => {
  return (
    <ResourceCreateStep title="Review new resource configuration">
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

        {Object.keys(instanceAttrs).length > 0 && (
          <DescriptionListGroup>
            <DescriptionListTerm>Instance attributes</DescriptionListTerm>
            <DescriptionListDescription>
              <DescriptionList isHorizontal>
                {Object.keys(instanceAttrs).map(attrName => (
                  <DescriptionListGroup key={attrName}>
                    <DescriptionListTerm>{attrName}</DescriptionListTerm>
                    <DescriptionListDescription>
                      {instanceAttrs[attrName]}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                ))}
              </DescriptionList>
            </DescriptionListDescription>
          </DescriptionListGroup>
        )}
      </DescriptionList>
    </ResourceCreateStep>
  );
};
