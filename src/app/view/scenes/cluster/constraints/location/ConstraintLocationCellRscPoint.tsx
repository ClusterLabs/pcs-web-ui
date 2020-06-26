import React from "react";

import { types } from "app/store";
import { Link } from "app/view/common";
import { useSelectedClusterName } from "app/view/scenes/cluster";

import { ConstraintCell } from "../common";

export const ConstraintLocationCellRscPoint = ({
  constraint,
}: {
  constraint:
    | types.cluster.ConstraintLocationNode
    | types.cluster.ConstraintLocationRule;
}) => {
  const clusterName = useSelectedClusterName();
  return (
    <>
      {"rsc" in constraint && (
        <ConstraintCell label="Resource">
          <Link to={`/cluster/${clusterName}/resources/${constraint.rsc}`} />
        </ConstraintCell>
      )}
      {"rsc-pattern" in constraint && (
        <ConstraintCell
          label="Resources pattern"
          value={constraint["rsc-pattern"]}
        />
      )}
    </>
  );
};
