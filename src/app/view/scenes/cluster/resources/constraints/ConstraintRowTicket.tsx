import React from "react";

import { types } from "app/store";

import ConstraintRow from "./ConstraintRow";
import ConstraintCell from "./ConstraintCell";
import ConstraintCellResourceSet from "./ConstraintCellResourceSet";

const ConstraintRowColocation = ({ constraint }: {
  constraint: types.cluster.ConstraintTicket;
}) => {
  if ("sets" in constraint) {
    return (
      <ConstraintRow aria-labelledby={`Ticket constraint ${constraint.id}`}>
        <ConstraintCell label="Type" value="Ticket (set)" />
        <ConstraintCell label="Ticket" value={constraint.ticket} />
        <ConstraintCellResourceSet resourceSetList={constraint.sets} />
      </ConstraintRow>
    );
  }
  return (
    <ConstraintRow aria-labelledby={`Ticket constraint ${constraint.id}`}>
      <ConstraintCell label="Type" value="Ticket" />
      <ConstraintCell label="Ticket" value={constraint.ticket} />
    </ConstraintRow>
  );
};

export default ConstraintRowColocation;
