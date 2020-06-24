import React from "react";
import {
  DataListItem,
  DataListItemCells,
  DataListItemRow,
} from "@patternfly/react-core";

export const ConstraintRow = ({
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
