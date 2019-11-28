import React from "react";
import {
  DataListItem,
  DataListCell,
  DataListItemRow,
  DataListItemCells,
} from "@patternfly/react-core";
import { types } from "app/services/cluster";

const ConstraintColocationSet = ({ constraint }: {
  constraint: types.ConstraintColocationSet,
}) => {
  return (
    <DataListItem aria-labelledby={`Location constraint ${constraint.id}`}>
      <DataListItemRow>
        <DataListItemCells dataListCells={[

          <DataListCell key="type">
            <span>Type</span>
            {" "}
            <strong>Colocation (set)</strong>
          </DataListCell>,

          <DataListCell key="node">
            <span>
              {"Set "}
              <strong>
                {constraint.sets.map((resourceSet) => {
                  if ("referenceId" in resourceSet) {
                    return null;
                  }
                  return (
                    <div key={resourceSet.id}>
                      {resourceSet.resourceIdList.map(resourceId => (
                        <span key={resourceId}>{`${resourceId} `}</span>
                      ))}
                    </div>
                  );
                })}
              </strong>
            </span>
          </DataListCell>,

          <DataListCell key="score">
            <span>Score </span>
            <strong>{constraint.score}</strong>
          </DataListCell>,
        ]}
        />
      </DataListItemRow>
    </DataListItem>
  );
};

export default ConstraintColocationSet;
