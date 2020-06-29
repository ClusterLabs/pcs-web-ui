import React from "react";

import { types } from "app/store";

import {
  ConstraintCellResourceSet,
  ConstraintResourceSetList,
} from "../resourceSet";
import { ConstraintCell, ConstraintRow, ConstraintValue } from "../common";

import { ConstraintCellOrderScoreKind } from "./ConstraintCellOrderScoreKind";

export const ConstraintRowOrderSet = ({
  constraint,
}: {
  constraint: types.cluster.ConstraintOrderSet;
}) => {
  return (
    <ConstraintRow
      id={constraint.id}
      dataListCells={
        <>
          <ConstraintCell label="Type" value="Order (set)" />
          <ConstraintCellResourceSet resourceSetList={constraint.sets} />
          <ConstraintCellOrderScoreKind constraint={constraint} />
        </>
      }
      content={
        <>
          <ConstraintValue label="Symetrical" value={constraint.symmetrical} />
          <ConstraintValue
            label="Require all"
            value={constraint["require-all"]}
          />
          <ConstraintResourceSetList resourceSetList={constraint.sets} />
        </>
      }
    />
  );
};
