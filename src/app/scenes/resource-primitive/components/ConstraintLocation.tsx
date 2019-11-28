import React from "react";
import {
  DataListItem,
  DataListCell,
  DataListItemRow,
  DataListItemCells,
} from "@patternfly/react-core";
import { types } from "app/services/cluster";

const ConstraintLocation = ({ constraint }: {
  constraint: types.ConstraintLocation,
}) => {
  return (
    <DataListItem aria-labelledby={`Location constraint ${constraint.id}`}>
      <DataListItemRow>
        <DataListItemCells dataListCells={[

          <DataListCell key="type">
            <span>Type</span>
            {" "}
            <strong>Location</strong>
          </DataListCell>,

          <DataListCell key="node">
            <span>
              {"Node "}
              <strong>{constraint.node}</strong>
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

export default ConstraintLocation;
