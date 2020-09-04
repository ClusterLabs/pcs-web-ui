import React from "react";

import { types } from "app/store";

import { ConstraintCell, ConstraintRow } from "../common";

import { ColocationCellResourceSetList } from "./ColocationCellResourceSetList";

export const ConstraintRowColocationSet = ({
  constraint,
}: {
  constraint: types.cluster.ConstraintColocationSet;
}) => {
  return (
    <ConstraintRow
      id={constraint.id}
      dataListCells={
        <>
          <ConstraintCell label="Type" value="Colocation (set)" width={1} />
          <ColocationCellResourceSetList
            resourceSetList={constraint.sets}
            score={constraint.score}
          />
        </>
      }
    />
  );
};
