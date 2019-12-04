import React from "react";

import { types } from "app/services/cluster";

import ConstraintRow from "./ConstraintRow";
import ConstraintCell from "./ConstraintCell";

const ConstraintRowOrder = ({ constraint, resourceId }: {
  constraint: types.ConstraintOrder;
  resourceId: string;
}) => {
  return (
    <ConstraintRow aria-labelledby={`Order constraint ${constraint.id}`}>
      <ConstraintCell key="type" label="Type" value="Order" />
      {constraint.firstResource.id === resourceId && (
        <ConstraintCell
          key="before-after"
          label="Before"
          value={constraint.thenResource.id}
        />
      )}
      {constraint.firstResource.id !== resourceId && (
        <ConstraintCell
          key="before-after"
          label="After"
          value={constraint.firstResource.id}
        />
      )}
      <ConstraintCell
        key="symmetrical"
        label="Symetrical"
        value={constraint.symmetrical}
      />
    </ConstraintRow>
  );
};

export default ConstraintRowOrder;
