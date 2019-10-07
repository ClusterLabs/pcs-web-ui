import React from "react";

import { ResourceTreeItem } from "app/services/cluster/types";

const ResourceDetailViewCaption = ({ resource }: {
  resource: ResourceTreeItem,
}) => {
  switch (resource.itemType) {
    case "group": return (
      <>
        <span>Group </span>
        <strong>{resource.id}</strong>
      </>
    );
    case "resource": return (
      <>
        <strong>{`${resource.id}: `}</strong>
        <span>
          {`${resource.type} (${resource.class}:${resource.provider})`}
        </span>
      </>
    );
    case "clone": default: return (
      <>
        <span>Clone </span>
        <strong>{resource.id}</strong>
      </>
    );
  }
};

export default ResourceDetailViewCaption;
