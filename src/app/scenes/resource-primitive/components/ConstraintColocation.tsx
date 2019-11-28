import React from "react";
import {
  DataListItem,
  DataListCell,
  DataListItemRow,
  DataListItemCells,
} from "@patternfly/react-core";
import { types } from "app/services/cluster";

const ConstraintColocation = ({ constraint }: {
  constraint: types.ConstraintColocation,
}) => {
  return (
    <DataListItem aria-labelledby={`Location constraint ${constraint.id}`}>
      <DataListItemRow>
        <DataListItemCells dataListCells={[

          <DataListCell key="type">
            <span>Type</span>
            {" "}
            <strong>Colocation</strong>
          </DataListCell>,

          <DataListCell key="node">
            <span>
              {"With resource "}
              <strong>{constraint.secondResource.id}</strong>
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

export default ConstraintColocation;
