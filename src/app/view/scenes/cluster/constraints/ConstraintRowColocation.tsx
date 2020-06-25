import React from "react";

import { types } from "app/store";
import { Link } from "app/view/common";
import { useSelectedClusterName } from "app/view/scenes/cluster";

import { ConstraintCell, ConstraintRow, ConstraintValue } from "./common";
import {
  ConstraintCellResourceSet,
  ConstraintResourceSetList,
} from "./resourceSet";

export const ConstraintRowColocation = ({
  constraint,
}: {
  constraint: types.cluster.ConstraintColocation;
}) => {
  const clusterName = useSelectedClusterName();
  if ("sets" in constraint) {
    return (
      <ConstraintRow
        aria-labelledby={`Colocation constraint ${constraint.id}`}
        dataListCells={
          <>
            <ConstraintCell label="Type" value="Colocation (set)" />
            <ConstraintCellResourceSet resourceSetList={constraint.sets} />
            <ConstraintCell label="Score" value={constraint.score} />
          </>
        }
        content={
          <ConstraintResourceSetList resourceSetList={constraint.sets} />
        }
      />
    );
  }
  return (
    <ConstraintRow
      aria-labelledby={`Colocation constraint ${constraint.id}`}
      dataListCells={
        <>
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
        </>
      }
      content={
        <>
          <ConstraintValue
            label="Node attribute"
            value={constraint["node-attribute"]}
          />
          <ConstraintValue
            label="Resource role"
            value={constraint["rsc-role"]}
          />
          <ConstraintValue
            label="With resource role"
            value={constraint["with-rsc-role"]}
          />
          <ConstraintValue
            label="Resource instance"
            value={constraint["rsc-instance"]}
          />
          <ConstraintValue
            label="With resource instance"
            value={constraint["with-rsc-instance"]}
          />
        </>
      }
    />
  );
};
