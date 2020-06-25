import React from "react";
import {
  DataListContent,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  DataListToggle,
} from "@patternfly/react-core";

export const ConstraintRow = ({
  "aria-labelledby": ariaLabelledBy,
  dataListCells,
  content = null,
}: React.PropsWithChildren<{
  "aria-labelledby": string;
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
          id="ex-toggle1"
          aria-controls="ex-expand1"
        />
        <DataListItemCells dataListCells={dataListCells} />
      </DataListItemRow>
      <DataListContent
        aria-label="Primary Content Details"
        id="ex-expand1"
        isHidden={!showDetails}
      >
        {content}
      </DataListContent>
    </DataListItem>
  );
};
