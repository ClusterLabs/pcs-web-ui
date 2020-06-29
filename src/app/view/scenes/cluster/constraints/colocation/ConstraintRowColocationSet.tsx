import React from "react";

import { types } from "app/store";

import { ConstraintCell, ConstraintRow } from "../common";
import {
  ConstraintCellResourceSet,
  ConstraintResourceSetList,
} from "../resourceSet";

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
          <ConstraintCell label="Type" value="Colocation (set)" />
          <ConstraintCellResourceSet resourceSetList={constraint.sets} />
          <ConstraintCell label="Score" value={constraint.score} />
        </>
      }
      content={<ConstraintResourceSetList resourceSetList={constraint.sets} />}
    />
  );
};
