import React from "react";
import { useSelector } from "react-redux";

import { selectors } from "app/store";

import ResourceDoesNotExists from "./ResourceDoesNotExists";
import { ClonePage } from "./clone";
import { GroupPage } from "./group";
import { PrimitivePage } from "./primitive";

const ResourceDetailPage = ({ resourceUrlName, urlPrefix, onClose }: {
  resourceUrlName: string;
  urlPrefix: string;
  onClose: (e: React.SyntheticEvent) => void;
}) => {
  const resourceTreeItem = useSelector(
    selectors.getSelectedResource(resourceUrlName),
  );

  if (!resourceTreeItem) {
    return (
      <ResourceDoesNotExists
        onClose={onClose}
        resourceUrlName={resourceUrlName}
      />
    );
  }

  switch (resourceTreeItem.itemType) {
    case "primitive": return (
      <PrimitivePage
        primitive={resourceTreeItem}
        urlPrefix={urlPrefix}
        onClose={onClose}
      />
    );
    case "group": return (
      <GroupPage
        group={resourceTreeItem}
        urlPrefix={urlPrefix}
        onClose={onClose}
      />
    );
    case "clone": default: return (
      <ClonePage
        clone={resourceTreeItem}
        urlPrefix={urlPrefix}
        onClose={onClose}
      />
    );
  }
};

export default ResourceDetailPage;
