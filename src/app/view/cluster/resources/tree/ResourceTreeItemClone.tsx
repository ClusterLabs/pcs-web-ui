import { Clone } from "app/view/cluster/types";

import { ResourceTreeItemPrimitive } from "./ResourceTreeItemPrimitive";
import { ResourceTreeItemGroup } from "./ResourceTreeItemGroup";
import { ResourceTreeItemCompound } from "./ResourceTreeItemCompound";
import { ResourceTreeItemFenceDevice } from "./ResourceTreeItemFenceDevice";

export const ResourceTreeItemClone = ({ clone }: { clone: Clone }) => {
  return (
    <ResourceTreeItemCompound
      resourceId={clone.id}
      nestingDepth={1}
      status={clone.status}
      type="Clone"
    >
      {clone.member.itemType === "primitive" && (
        <ResourceTreeItemPrimitive primitive={clone.member} />
      )}
      {clone.member.itemType === "group" && (
        <ResourceTreeItemGroup group={clone.member} nestedLevel={1} />
      )}
      {clone.member.itemType === "fence-device" && (
        <ResourceTreeItemFenceDevice
          key={clone.member.id}
          fenceDevice={clone.member}
        />
      )}
    </ResourceTreeItemCompound>
  );
};
