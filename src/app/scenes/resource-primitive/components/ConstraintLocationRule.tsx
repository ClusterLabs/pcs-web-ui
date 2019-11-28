import React from "react";
import {
  DataListItem,
  DataListCell,
  DataListItemRow,
  DataListItemCells,
} from "@patternfly/react-core";
import { types } from "app/services/cluster";

const ConstraintLocationRule = ({ constraint }: {
  constraint: types.ConstraintLocationRule,
}) => {
  return (
    <DataListItem aria-labelledby={`Location constraint ${constraint.id}`}>
      <DataListItemRow>
        <DataListItemCells dataListCells={[

          <DataListCell key="type">
            <span>Type</span>
            {" "}
            <strong>Location (rule)</strong>
          </DataListCell>,

          <DataListCell key="rule">
            <span>
              {"Rule "}
              <strong>{constraint.ruleString}</strong>
            </span>
          </DataListCell>,

          <DataListCell key="score">
            <span>Score </span>
            <strong>{constraint.ruleScore.value}</strong>
          </DataListCell>,

        ]}
        />
      </DataListItemRow>
    </DataListItem>
  );
};

export default ConstraintLocationRule;
