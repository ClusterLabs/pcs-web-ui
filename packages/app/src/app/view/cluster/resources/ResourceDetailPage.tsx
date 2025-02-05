import {
  useGroupDetailViewContext,
  useLoadedCluster,
} from "app/view/cluster/share";

import {getSelectedResource} from "./select";
import {ResourceDoesNotExists} from "./ResourceDoesNotExists";
import {ClonePage} from "./clone";
import {GroupPage} from "./group";
import {PrimitivePage} from "./primitive";
import {FenceDevicePage} from "./FenceDevicePage";

export const ResourceDetailPage = () => {
  const {selectedItemUrlName: resourceId} = useGroupDetailViewContext();
  const resourceTreeItem = getSelectedResource(
    useLoadedCluster().resourceTree,
    resourceId,
  );

  if (!resourceTreeItem) {
    return <ResourceDoesNotExists resourceId={resourceId} />;
  }

  switch (resourceTreeItem.itemType) {
    case "primitive":
      return <PrimitivePage primitive={resourceTreeItem} />;

    case "group":
      return <GroupPage group={resourceTreeItem} />;

    case "fence-device":
      return <FenceDevicePage fenceDevice={resourceTreeItem} />;
    default:
      return <ClonePage clone={resourceTreeItem} />;
  }
};
