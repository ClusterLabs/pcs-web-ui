import React from "react";

import { types } from "app/store";
import { Link } from "app/view/common";
import { useSelectedClusterName } from "app/view/scenes/cluster";

import { ConstraintCellResourceSet } from "./ConstraintCellResourceSet";
import { ConstraintRow } from "./ConstraintRow";
import { ConstraintCell } from "./ConstraintCell";
import { ConstraintCellOrderScoreKind } from "./ConstraintCellOrderScoreKind";

export const ConstraintRowOrder = ({
  constraint,
}: {
  constraint: types.cluster.ConstraintOrder;
}) => {
  const clusterName = useSelectedClusterName();
  if ("sets" in constraint) {
    return (
      <ConstraintRow aria-labelledby={`Order constraint ${constraint.id}`}>
        <ConstraintCell label="Type" value="Order (set)" />
        <ConstraintCellResourceSet resourceSetList={constraint.sets} />
        <ConstraintCellOrderScoreKind constraint={constraint} />
      </ConstraintRow>
    );
  }
  return (
    <ConstraintRow aria-labelledby={`Order constraint ${constraint.id}`}>
      <ConstraintCell label="Type" value="Order" />
      <ConstraintCell label="First">
        <Link to={`/cluster/${clusterName}/resources/${constraint.first}`}>
          {constraint.first}
        </Link>
      </ConstraintCell>
      <ConstraintCell label="Then">
        <Link to={`/cluster/${clusterName}/resources/${constraint.then}`}>
          {constraint.then}
        </Link>
      </ConstraintCell>
      <ConstraintCellOrderScoreKind constraint={constraint} />
    </ConstraintRow>
  );
};
