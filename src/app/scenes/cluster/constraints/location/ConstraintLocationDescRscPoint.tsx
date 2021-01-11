import React from "react";

import { Link, useSelectedClusterName } from "app/view";
import { location, types } from "app/store";

export const ConstraintLocationDescRscPoint: React.FC<{
  constraint:
    | types.cluster.ConstraintLocationRule
    | types.cluster.ConstraintLocationNode;
}> = ({ constraint }) => {
  const clusterName = useSelectedClusterName();
  if ("rsc" in constraint) {
    return (
      <>
        {"Resource "}
        <strong>
          <Link
            to={location.resource({ clusterName, resourceId: constraint.rsc })}
          />
        </strong>
      </>
    );
  }
  return (
    <>
      {"Resources matching "}
      <strong>{constraint["rsc-pattern"]}</strong>
    </>
  );
};
