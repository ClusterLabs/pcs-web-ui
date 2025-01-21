import type React from "react";
import {
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
} from "@patternfly/react-core";

import {DefaultValue} from "app/view/share/DefaultValue";

export const ReviewItem = (props: {
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
}) => {
  let value = props.value;
  if (
    "useDefault" in props &&
    props.useDefault &&
    (("when" in props.useDefault && props.useDefault.when) ||
      ("whenValue" in props.useDefault &&
        props.value === props.useDefault.whenValue))
  ) {
    value = (
      <>
        <div>{props.useDefault.defaultValue}</div>
        <DefaultValue value="Default value" />
      </>
    );
  }

  return (
    <DescriptionListGroup>
      <DescriptionListTerm>{props.label}</DescriptionListTerm>
      <DescriptionListDescription data-test={props["data-test"]}>
        {value}
      </DescriptionListDescription>
    </DescriptionListGroup>
  );
};
