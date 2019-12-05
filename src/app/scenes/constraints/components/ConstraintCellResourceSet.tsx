import React from "react";
import { types } from "app/services/cluster";

import ConstraintCell from "./ConstraintCell";

const ConstraintCellResourceSet = ({ resourceSetList }: {
  resourceSetList: types.ConstraintResourceSet[],
}) => {
  return (
    <ConstraintCell label="Set">
      {resourceSetList.map((resourceSet) => {
        if ("id-ref" in resourceSet) {
          return null;
        }
        return (
          <div key={resourceSet.id}>
            {resourceSet.resources.map(resourceId => (
              <span key={resourceId}>{`${resourceId} `}</span>
            ))}
          </div>
        );
      })}
    </ConstraintCell>
  );
};

export default ConstraintCellResourceSet;
