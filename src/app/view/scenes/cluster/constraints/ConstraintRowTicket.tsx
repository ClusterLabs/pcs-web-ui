import React from "react";

import { types } from "app/store";
import { Link } from "app/view/common";
import { useSelectedClusterName } from "app/view/scenes/cluster";

import { ConstraintCell, ConstraintRow, ConstraintValue } from "./common";
import {
  ConstraintCellResourceSet,
  ConstraintResourceSetList,
} from "./resourceSet";

export const ConstraintRowTicket = ({
  constraint,
}: {
  constraint: types.cluster.ConstraintTicket;
}) => {
  const clusterName = useSelectedClusterName();
  if ("sets" in constraint) {
    return (
      <ConstraintRow
        aria-labelledby={`Ticket constraint ${constraint.id}`}
        dataListCells={
          <>
            <ConstraintCell label="Type" value="Ticket (set)" />
            <ConstraintCell label="Ticket" value={constraint.ticket} />
            <ConstraintCellResourceSet resourceSetList={constraint.sets} />
          </>
        }
        content={
          <>
            <ConstraintValue
              label="Loss policy"
              value={constraint["loss-policy"]}
            />
            <ConstraintResourceSetList resourceSetList={constraint.sets} />
          </>
        }
      />
    );
  }
  return (
    <ConstraintRow
      aria-labelledby={`Ticket constraint ${constraint.id}`}
      dataListCells={
        <>
          <ConstraintCell label="Type" value="Ticket" />
          <ConstraintCell label="Ticket" value={constraint.ticket} />
          <ConstraintCell label="Resource">
            <Link to={`/cluster/${clusterName}/resources/${constraint.rsc}`}>
              {constraint.rsc}
            </Link>
          </ConstraintCell>
        </>
      }
      content={
        <>
          <ConstraintValue
            label="Loss policy"
            value={constraint["loss-policy"]}
          />
          <ConstraintValue
            label="Resource role"
            value={constraint["rsc-role"]}
          />
        </>
      }
    />
  );
};
