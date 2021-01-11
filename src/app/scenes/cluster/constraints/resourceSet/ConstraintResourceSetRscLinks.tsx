import React from "react";

import { location, types } from "app/store";
import { Link, useSelectedClusterName } from "app/view";

export const ConstraintResourceSetRscLinks: React.FC<{
  resourceSet: types.cluster.ConstraintResourceSetStructured;
}> = ({ resourceSet }) => {
  const clusterName = useSelectedClusterName();
  return (
    <>
      {resourceSet.resources
        .map<React.ReactNode>(resourceId => (
          <Link
            key={resourceId}
            to={location.resource({ clusterName, resourceId })}
          />
        ))
        .reduce((prev, curr) => [prev, " ", curr])}
    </>
  );
};
