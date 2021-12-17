import React from "react";

import { Link } from "app/view/share";

export const ResourceTreeCellName: React.FC<{
  resourceId: string;
}> = ({ resourceId }) => {
  return (
    <Link to={`/${resourceId}`}>
      <strong data-test="resource-tree-item-name">{resourceId}</strong>
    </Link>
  );
};
