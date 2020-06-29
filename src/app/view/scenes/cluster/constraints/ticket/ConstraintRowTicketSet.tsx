import React from "react";

import { types } from "app/store";

import { ConstraintCell, ConstraintRow, ConstraintValue } from "../common";
import {
  ConstraintCellResourceSet,
  ConstraintResourceSetList,
} from "../resourceSet";

export const ConstraintRowTicketSet = ({
  constraint,
}: {
  constraint: types.cluster.ConstraintTicketSet;
}) => {
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
};
