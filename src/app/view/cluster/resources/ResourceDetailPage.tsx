import { selectors } from "app/store";
import { useClusterSelector, useGroupDetailViewContext } from "app/view/share";

import { ResourceDoesNotExists } from "./ResourceDoesNotExists";
import { ClonePage } from "./clone";
import { GroupPage } from "./group";
import { PrimitivePage } from "./primitive";

export const ResourceDetailPage = () => {
  const { selectedItemUrlName } = useGroupDetailViewContext();
  const [resourceTreeItem] = useClusterSelector(
    selectors.getSelectedResource,
    selectedItemUrlName,
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
