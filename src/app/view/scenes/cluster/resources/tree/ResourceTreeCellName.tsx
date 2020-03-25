import React from "react";
import { Link } from "react-router-dom";

export const ResourceTreeCellName = ({ resourceId, detailUrl }: {
  resourceId: string;
  detailUrl: string;
}) => {
  return (
    <Link to={detailUrl} id={`resource-tree-item-${resourceId}`}>
      <strong>{resourceId}</strong>
    </Link>
  );
};
