import React from "react";
import { Link } from "react-router-dom";

import { useResourceTreeContext } from "./ResourceTreeContext";

export const ResourceTreeCellName = ({ resourceId }: {
  resourceId: string;
}) => {
  const { clusterUrlName } = useResourceTreeContext();
  return (
    <Link
      to={`/cluster/${clusterUrlName}/resources/${resourceId}`}
      id={`resource-tree-item-${resourceId}`}
    >
      <strong>{resourceId}</strong>
    </Link>
  );
};
