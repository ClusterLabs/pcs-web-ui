import React from "react";
import {
  DataListContent,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  DataListToggle,
} from "@patternfly/react-core";

export const ConstraintRow: React.FC<{
  id?: string;
  content?: React.ReactNode;
  dataListCells: React.ComponentProps<
    typeof DataListItemCells
  >["dataListCells"];
}> = ({ id = "", dataListCells, content = null }) => {
  const [showDetails, setShowDetails] = React.useState(false);
  const rowId = `constraint-${id}-row`;
  return (
    <DataListItem aria-labelledby={rowId} isExpanded={showDetails}>
      <DataListItemRow id={rowId}>
        <DataListToggle
          onClick={() => setShowDetails(!showDetails)}
          isExpanded={showDetails}
          id={`constraint-row-${id}`}
          aria-controls={`details-constraint-${id}`}
          aria-hidden={content === null}
        />
        <DataListItemCells dataListCells={dataListCells} />
      </DataListItemRow>
      <DataListContent
        aria-label={`Details of constraint ${id}`}
        id={`details-constraint-${id}`}
        isHidden={content === null || !showDetails}
      >
        {content}
      </DataListContent>
    </DataListItem>
  );
};
