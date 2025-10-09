import type React from "react";
import {DescriptionListTerm} from "@patternfly/react-core";

export const AttributeName = ({
  name,
  "data-test": dataTest,
  children,
}: React.PropsWithChildren<{name: string; "data-test"?: string}>) => {
  if (!children) {
    return (
      <DescriptionListTerm data-test={dataTest}>{name}</DescriptionListTerm>
    );
  }
  return (
    <DescriptionListTerm data-test={dataTest}>
      {`${name} `}
      {children}
    </DescriptionListTerm>
  );
};
