import React from "react";
import { types } from "app/services/cluster";

import ConstraintCell from "./ConstraintCell";

const ConstraintCellResourceSet = ({ resourceSetList }: {
  resourceSetList: types.ResourceSet[],
}) => {
  return (
    <ConstraintCell label="Set">
      {resourceSetList.map((resourceSet) => {
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
  );
};

export default ConstraintCellResourceSet;
