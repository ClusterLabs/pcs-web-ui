import React from "react";
import { types } from "app/store";
import { Link } from "app/view/common";
import { useSelectedClusterName } from "app/view/scenes/cluster";

import { ConstraintCell } from "../common";

export const ConstraintCellResourceSet = ({
  resourceSetList,
}: {
  resourceSetList: types.cluster.ConstraintResourceSet[];
}) => {
  const clusterName = useSelectedClusterName();
  return (
    <ConstraintCell label="Set">
      {resourceSetList.map((resourceSet) => {
        if ("id-ref" in resourceSet) {
          return null;
        }
        return (
          <div key={resourceSet.id}>
            {resourceSet.resources.map(resourceId => (
              <Link
                key={resourceId}
                to={`/cluster/${clusterName}/resources/${resourceId}`}
              >
                {`${resourceId} `}
              </Link>
            ))}
          </div>
        );
      })}
    </ConstraintCell>
  );
};
