import React from "react";

import { Link, useSelectedClusterName } from "app/view";
import { types, url } from "app/store";

export const ConstraintLocationDescRscPoint: React.FC<{
  constraint: types.cluster.ConstraintLocationRule;
}> = ({ constraint }) => {
  const clusterName = useSelectedClusterName();
  if ("rsc" in constraint && constraint.rsc) {
    return (
      <>
        {"Resource "}
        <strong>
          <Link to={url.cluster.resources(clusterName, constraint.rsc)} />
        </strong>
      </>
    );
  }
  if ("rsc-pattern" in constraint) {
    return (
      <>
        {"Resource matching "}
        <strong>{constraint["rsc-pattern"]}</strong>
      </>
    );
  }
  return null;
};
