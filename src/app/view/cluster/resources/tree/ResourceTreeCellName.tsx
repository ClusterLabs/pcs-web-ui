import React from "react";

import { Link, useGroupDetailViewContext } from "app/view/share";

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
