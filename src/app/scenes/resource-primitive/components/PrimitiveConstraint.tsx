import React from "react";
import {
  DataListItem,
  DataListCell,
  DataListItemRow,
  DataListItemCells,
} from "@patternfly/react-core";
import { types } from "app/services/cluster";

const PrimitiveConstraint = ({ constraint }: {
  constraint: types.Constraint,
}) => {
  const fields: JSX.Element[] = [
    <DataListCell key="type">
      <span>Type</span>
      {" "}
      <strong>Location</strong>
    </DataListCell>,
  ];
  if ("node" in constraint) {
    fields.push(...[
      <DataListCell key="node">
        <span id="pref-1">
          {"Node "}
          <strong>{constraint.node}</strong>
        </span>
      </DataListCell>,
      <DataListCell key="score">
        <span>Score </span>
        <strong>{constraint.score}</strong>
      </DataListCell>,
    ]);
  }
  return (
    <DataListItem aria-labelledby={`Location constraint ${constraint.id}`}>
      <DataListItemRow>
        <DataListItemCells dataListCells={fields} />
      </DataListItemRow>
    </DataListItem>
  );
};

export default PrimitiveConstraint;
