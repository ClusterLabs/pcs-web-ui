import React from "react";
import {DataListCell} from "@patternfly/react-core";

import {ConstraintValue} from "./ConstraintValue";

export const ConstraintCell = ({
  label,
  value,
  children,
  width = 1,
}: React.PropsWithChildren<{
  label: string;
  value?: string | number | boolean | undefined | null;
  width?: React.ComponentProps<typeof DataListCell>["width"];
}>) => {
  return (
    <DataListCell key="type" width={width}>
      <ConstraintValue label={label} value={value} block={false}>
        {children}
      </ConstraintValue>
    </DataListCell>
  );
};
