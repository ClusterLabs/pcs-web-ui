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
          <ConstraintCell label="Type" value="Colocation (set)" width={1} />
          <ConstraintCellResourceSet resourceSetList={constraint.sets} />
          <ConstraintCell label="Score" value={constraint.score} width={1} />
        </>
      }
      content={<ConstraintResourceSetList resourceSetList={constraint.sets} />}
    />
  );
};
