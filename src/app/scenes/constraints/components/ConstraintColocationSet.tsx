import React from "react";

import { types } from "app/services/cluster";

import ConstraintRow from "./ConstraintRow";
import ConstraintCell from "./ConstraintCell";

const ConstraintColocationSet = ({ constraint }: {
  constraint: types.ConstraintColocationSet,
}) => {
  return (
    <ConstraintRow aria-labelledby={`Colocation constraint ${constraint.id}`}>
      <ConstraintCell key="type" label="Type" value="Colocation" />
      <ConstraintCell key="node" label="Set">
        {constraint.sets.map((resourceSet) => {
          if ("referenceId" in resourceSet) {
            return null;
          }
          return (
            <div key={resourceSet.id}>
              {resourceSet.resourceIdList.map(resourceId => (
                <span key={resourceId}>{`${resourceId} `}</span>
              ))}
            </div>
          );
        })}
      </ConstraintCell>
      <ConstraintCell key="score" label="Score" value={constraint.score} />
    </ConstraintRow>
  );
};

export default ConstraintColocationSet;
