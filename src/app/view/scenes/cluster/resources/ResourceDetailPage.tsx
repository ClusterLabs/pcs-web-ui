import React from "react";
import { useSelector } from "react-redux";

import { DetailComponentProps } from "app/view/common/clusterGroupDetail";
import { selectors } from "app/store";

import { ResourceDoesNotExists } from "./ResourceDoesNotExists";
import { ClonePage } from "./clone";
import { GroupPage } from "./group";
import { PrimitivePage } from "./primitive";

export const ResourceDetailPage = ({
  detailUrlName,
  urlPrefix,
  onClose,
}: DetailComponentProps) => {
  const resourceTreeItem = useSelector(
    selectors.getSelectedResource(detailUrlName),
  );

  if (!resourceTreeItem) {
    return (
      <ResourceDoesNotExists
        onClose={onClose}
        resourceUrlName={detailUrlName}
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
