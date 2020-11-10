import React from "react";
import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
} from "@patternfly/react-core";

import { WizardLibStep } from "app/view";

import { useWizard } from "../useWizard";

export const ResourceCreateReview: React.FC = () => {
  const {
    state: {
      agentName,
      resourceName,
      instanceAttrs,
      reports,
      clone,
      promotable,
      useGroup,
      group,
      disabled,
    },
  } = useWizard();
  return (
    <WizardLibStep title="Review new resource configuration" reports={reports}>
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

        <DescriptionListGroup>
          <DescriptionListTerm>Instance attributes</DescriptionListTerm>
          <DescriptionListDescription>
            {Object.keys(instanceAttrs).length > 0 ? (
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
            ) : (
              "No attribute configured"
            )}
          </DescriptionListDescription>
        </DescriptionListGroup>

        <DescriptionListGroup>
          <DescriptionListTerm>Clone</DescriptionListTerm>
          <DescriptionListDescription>
            {clone ? `yes${promotable ? " - promotable" : ""}` : "no"}
          </DescriptionListDescription>
        </DescriptionListGroup>

        <DescriptionListGroup>
          <DescriptionListTerm>Group</DescriptionListTerm>
          <DescriptionListDescription>
            {useGroup === "no" && "no"}
            {useGroup === "new" && `new group: ${group}`}
            {useGroup === "existing" && `existing group: ${group}`}
          </DescriptionListDescription>
        </DescriptionListGroup>

        <DescriptionListGroup>
          <DescriptionListTerm>Disabled</DescriptionListTerm>
          <DescriptionListDescription>
            {disabled ? "yes" : "no"}
          </DescriptionListDescription>
        </DescriptionListGroup>
      </DescriptionList>
    </WizardLibStep>
  );
};
