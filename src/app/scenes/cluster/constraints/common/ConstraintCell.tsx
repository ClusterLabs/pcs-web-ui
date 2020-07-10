import React from "react";
import { DataListCell } from "@patternfly/react-core";

import { ConstraintValue } from "./ConstraintValue";

export const ConstraintCell = ({
  label,
  value,
  children,
}: React.PropsWithChildren<{
  label: string;
  value?: string | number | boolean | undefined | null;
}>) => {
  return (
    <DataListCell key="type">
      <ConstraintValue label={label} value={value} block={false}>
        {children}
      </ConstraintValue>
    </DataListCell>
  );
};
