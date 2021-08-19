import React from "react";
import {
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
} from "@patternfly/react-core";

import { ReviewDefault } from "./ReviewDefault";

export const ReviewValue: React.FC<{
  label: React.ReactNode;
  value: React.ReactNode;
  "data-test"?: string;
  useDefault?: (
    | {
        when: boolean;
      }
    | {
        whenValue: unknown;
      }
  ) & {
    defaultValue: React.ReactNode;
  };
}> = (props) => {
  if (
    "useDefault" in props
    && props.useDefault
    && (("when" in props.useDefault && props.useDefault.when)
      || ("whenValue" in props.useDefault
        && props.value === props.useDefault.whenValue))
  ) {
    return (
      <DescriptionListGroup>
        <DescriptionListTerm>{props.label}</DescriptionListTerm>
        <DescriptionListDescription
          {...("data-test" in props && props["data-test"] !== undefined
            ? { "data-test": `${props["data-test"]}-review-value` }
            : {})}
        >
          <>
            <div>{props.useDefault.defaultValue}</div>
            <ReviewDefault value="Default value" />
          </>
        </DescriptionListDescription>
      </DescriptionListGroup>
    );
  }

  return (
    <DescriptionListGroup>
      <DescriptionListTerm>{props.label}</DescriptionListTerm>
      <DescriptionListDescription
        {...("data-test" in props && props["data-test"] !== undefined
          ? { "data-test": `${props["data-test"]}-review-value` }
          : {})}
      >
        {props.value}
      </DescriptionListDescription>
    </DescriptionListGroup>
  );
};
