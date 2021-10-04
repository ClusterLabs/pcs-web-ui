import {
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
} from "@patternfly/react-core";
import React from "react";

export const ReviewValue: React.FC<{
  label: React.ReactNode;
  value: React.ReactNode;
  "data-test"?: string;
}> = ({ label, value, "data-test": dataTest }) => {
  return (
    <DescriptionListGroup>
      <DescriptionListTerm>{label}</DescriptionListTerm>
      <DescriptionListDescription
        {...(dataTest !== undefined
          ? { "data-test": `${dataTest}-review-value` }
          : {})}
      >
        {value}
      </DescriptionListDescription>
    </DescriptionListGroup>
  );
};
