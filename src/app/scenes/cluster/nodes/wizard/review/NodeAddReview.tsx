import React from "react";
import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
} from "@patternfly/react-core";

import { WizardLibStep } from "app/view";

import { useWizard } from "../useWizard";

export const NodeAddReview: React.FC = () => {
  const {
    state: { nodeName, reports },
  } = useWizard();
  return (
    <WizardLibStep title="Review new resource configuration" reports={reports}>
      <DescriptionList isHorizontal>
        <DescriptionListGroup>
          <DescriptionListTerm>Node name</DescriptionListTerm>
          <DescriptionListDescription>{nodeName}</DescriptionListDescription>
        </DescriptionListGroup>
      </DescriptionList>
    </WizardLibStep>
  );
};
