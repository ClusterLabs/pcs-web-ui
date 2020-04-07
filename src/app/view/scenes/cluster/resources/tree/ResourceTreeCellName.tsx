import React from "react";
import { Link } from "react-router-dom";

import { useGroupDetailViewContext } from "app/view/common";

export const ResourceTreeCellName = ({
  resourceId,
}: {
  resourceId: string;
}) => {
  const { urlPrefix } = useGroupDetailViewContext();
  return (
    <Link
      to={`${urlPrefix}/${resourceId}`}
      id={`resource-tree-item-${resourceId}`}
    >
      <strong data-test="resource-tree-item-name">{resourceId}</strong>
    </Link>
  );
};
