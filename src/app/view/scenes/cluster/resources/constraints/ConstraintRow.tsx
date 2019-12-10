import React from "react";
import {
  DataListItem,
  DataListItemRow,
  DataListItemCells,
} from "@patternfly/react-core";

const ConstraintRow = ({
  "aria-labelledby": ariaLabelledBy,
  children,
}: React.PropsWithChildren<{
  "aria-labelledby": string;
  children: React.ComponentProps<typeof DataListItemCells>["dataListCells"];
}>) => {
  return (
    <DataListItem aria-labelledby={ariaLabelledBy}>
      <DataListItemRow>
        <DataListItemCells dataListCells={children} />
      </DataListItemRow>
    </DataListItem>
  );
};

export default ConstraintRow;
