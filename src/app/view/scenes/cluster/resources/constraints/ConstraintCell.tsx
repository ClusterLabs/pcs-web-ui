import React from "react";
import { DataListCell } from "@patternfly/react-core";

const ConstraintCell = (
  { label, value, children }: React.PropsWithChildren<{
    label: string,
    value?: string|number|boolean|undefined|null
  }>,
) => {
  return (
    <DataListCell key="type">
      <span>
        {`${label} `}
        <strong>
          {children && children}
          {!children && value}
        </strong>
      </span>
    </DataListCell>
  );
};

export default ConstraintCell;
