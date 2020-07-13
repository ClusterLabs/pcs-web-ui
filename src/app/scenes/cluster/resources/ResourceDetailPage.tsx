import React from "react";
import { useSelector } from "react-redux";

import { selectors } from "app/store";
import { useGroupDetailViewContext, useSelectedClusterName } from "app/view";

import { ResourceDoesNotExists } from "./ResourceDoesNotExists";
import { ClonePage } from "./clone";
import { GroupPage } from "./group";
import { PrimitivePage } from "./primitive";

export const ResourceDetailPage = () => {
  const { selectedItemUrlName } = useGroupDetailViewContext();
  const resourceTreeItem = useSelector(
    selectors.getSelectedResource(
      useSelectedClusterName(),
      selectedItemUrlName,
    ),
  );

  if (!resourceTreeItem) {
    return <ResourceDoesNotExists resourceUrlName={selectedItemUrlName} />;
  }

  switch (resourceTreeItem.itemType) {
    case "primitive":
      return <PrimitivePage primitive={resourceTreeItem} />;
    case "group":
      return <GroupPage group={resourceTreeItem} />;
    case "clone":
    default:
      return <ClonePage clone={resourceTreeItem} />;
  }
};
