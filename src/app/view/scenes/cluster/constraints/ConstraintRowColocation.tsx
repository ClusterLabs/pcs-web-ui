import React from "react";

import { types } from "app/store";
import { Link } from "app/view/common";
import { useSelectedClusterName } from "app/view/scenes/cluster";

import { ConstraintRow } from "./ConstraintRow";
import { ConstraintCell } from "./ConstraintCell";
import { ConstraintCellResourceSet } from "./ConstraintCellResourceSet";

export const ConstraintRowColocation = ({
  constraint,
}: {
  constraint: types.cluster.ConstraintColocation;
}) => {
  const clusterName = useSelectedClusterName();
  if ("sets" in constraint) {
    return (
      <ConstraintRow aria-labelledby={`Colocation constraint ${constraint.id}`}>
        <ConstraintCell label="Type" value="Colocation (set)" />
        <ConstraintCellResourceSet resourceSetList={constraint.sets} />
        <ConstraintCell label="Score" value={constraint.score} />
      </ConstraintRow>
    );
  }
  return (
    <ConstraintRow aria-labelledby={`Colocation constraint ${constraint.id}`}>
      <ConstraintCell label="Type" value="Colocation" />
      <ConstraintCell label="Resource">
        <Link to={`/cluster/${clusterName}/resources/${constraint.rsc}`}>
          {constraint.rsc}
        </Link>
      </ConstraintCell>
      <ConstraintCell label="With resource">
        <Link
          to={`/cluster/${clusterName}/resources/${constraint["with-rsc"]}`}
        >
          {constraint["with-rsc"]}
        </Link>
      </ConstraintCell>
      <ConstraintCell label="Score" value={constraint.score} />
    </ConstraintRow>
  );
};
