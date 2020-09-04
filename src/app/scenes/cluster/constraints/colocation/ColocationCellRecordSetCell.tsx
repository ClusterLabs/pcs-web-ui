import React from "react";
import {
  DataListCell,
  DataListContent,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  DataListToggle,
} from "@patternfly/react-core";

import { Link, useSelectedClusterName } from "app/view";
import { types, url } from "app/store";

import { ConstraintValue } from "../common";

export const ColocationCellRecordSetCell: React.FC<{
  resourceSet: types.cluster.ConstraintResourceSetStructured;
  score: types.cluster.Score | undefined;
}> = ({ resourceSet, score }) => {
  const clusterName = useSelectedClusterName();
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <DataListItem aria-labelledby={resourceSet.id} isExpanded={showDetails}>
      <DataListItemRow id={resourceSet.id}>
        <DataListToggle
          onClick={() => setShowDetails(!showDetails)}
          isExpanded={showDetails}
          id={`resource-set-row-${resourceSet.id}`}
          aria-controls={`details-resource-set-${resourceSet.id}`}
        />
        <DataListItemCells
          dataListCells={
            <>
              <DataListCell width={4}>
                {"Resources "}
                <strong>
                  {resourceSet.resources
                    .map<React.ReactNode>(resourceId => (
                      <Link
                        key={resourceId}
                        to={url.cluster.resources(clusterName, resourceId)}
                      />
                    ))
                    .reduce((prev, curr) => [prev, " ", curr])}
                </strong>
                {" in role "}
                <strong>{resourceSet.role || "Started"}</strong>
                {" together"}
              </DataListCell>
              <DataListCell width={1}>
                {"Score "}
                <strong>{resourceSet.score || score || "default"}</strong>
              </DataListCell>
            </>
          }
        />
      </DataListItemRow>
      <DataListContent
        aria-label={`Details-of-resource-set ${resourceSet.id}`}
        id={`details-resource-set-${resourceSet.id}`}
        isHidden={!showDetails}
      >
        <ConstraintValue label="Sequential" value={resourceSet.sequential} />
      </DataListContent>
    </DataListItem>
  );
};
