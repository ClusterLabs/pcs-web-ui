import React from "react";
import {
  DataListContent,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  DataListToggle,
} from "@patternfly/react-core";

export const ConstraintRow = ({
  id = "",
  "aria-labelledby": ariaLabelledBy = "Constraint",
  dataListCells,
  content = null,
}: React.PropsWithChildren<{
  id?: string;
  "aria-labelledby"?: string;
  content?: JSX.Element | null;
  dataListCells: React.ComponentProps<
    typeof DataListItemCells
  >["dataListCells"];
}>) => {
  const [showDetails, setShowDetails] = React.useState(false);
  return (
    <DataListItem aria-labelledby={ariaLabelledBy} isExpanded={showDetails}>
      <DataListItemRow>
        <DataListToggle
          onClick={() => setShowDetails(!showDetails)}
          isExpanded={showDetails}
          id={`constraint-row-${id}`}
          aria-controls="ex-expand1"
          aria-hidden={content === null}
        />
        <DataListItemCells dataListCells={dataListCells} />
      </DataListItemRow>
      <DataListContent
        aria-label="Primary Content Details"
        id="ex-expand1"
        isHidden={content === null || !showDetails}
      >
        {content}
      </DataListContent>
    </DataListItem>
  );
};
