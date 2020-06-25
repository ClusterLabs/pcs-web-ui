import React from "react";

import { types } from "app/store";
import { Link } from "app/view/common";
import { useSelectedClusterName } from "app/view/scenes/cluster";

import {
  ConstraintCellResourceSet,
  ConstraintResourceSetList,
} from "./resourceSet";
import { ConstraintCell, ConstraintRow, ConstraintValue } from "./common";

import { ConstraintCellOrderScoreKind } from "./ConstraintCellOrderScoreKind";

export const ConstraintRowOrder = ({
  constraint,
}: {
  constraint: types.cluster.ConstraintOrder;
}) => {
  const clusterName = useSelectedClusterName();
  if ("sets" in constraint) {
    return (
      <ConstraintRow
        aria-labelledby={`Order constraint ${constraint.id}`}
        dataListCells={
          <>
            <ConstraintCell label="Type" value="Order (set)" />
            <ConstraintCellResourceSet resourceSetList={constraint.sets} />
            <ConstraintCellOrderScoreKind constraint={constraint} />
          </>
        }
        content={
          <>
            <ConstraintValue
              label="Symetrical"
              value={constraint.symmetrical}
            />
            <ConstraintValue
              label="Require all"
              value={constraint["require-all"]}
            />
            <ConstraintResourceSetList resourceSetList={constraint.sets} />
          </>
        }
      />
    );
  }
  return (
    <ConstraintRow
      aria-labelledby={`Order constraint ${constraint.id}`}
      dataListCells={
        <>
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
        </>
      }
      content={
        <>
          <ConstraintValue label="Symetrical" value={constraint.symmetrical} />
          <ConstraintValue
            label="Require all"
            value={constraint["require-all"]}
          />
          <ConstraintValue
            label="First action"
            value={constraint["first-action"]}
          />
          <ConstraintValue
            label="Then action"
            value={constraint["then-action"]}
          />
          <ConstraintValue
            label="First instance"
            value={constraint["first-instance"]}
          />
          <ConstraintValue
            label="Then instance"
            value={constraint["then-instance"]}
          />
        </>
      }
    />
  );
};
