import React from "react";
import { types, url } from "app/store";
import { Link } from "app/view";
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
            {resourceSet.resources
              .map<React.ReactNode>(resourceId => (
                <Link
                  key={resourceId}
                  to={url.cluster.resources(clusterName, resourceId)}
                />
              ))
              .reduce((prev, curr) => [prev, " ", curr])}
          </div>
        );
      })}
    </ConstraintCell>
  );
};
