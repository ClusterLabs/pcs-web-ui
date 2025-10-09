import type React from "react";
import {DescriptionListGroup} from "@patternfly/react-core";

export const AttributeGroup = (
  props: React.PropsWithChildren<{"data-test"?: string}>,
) => {
  return (
    <DescriptionListGroup data-test={props["data-test"]}>
      {props.children}
    </DescriptionListGroup>
  );
};
