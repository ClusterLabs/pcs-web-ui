import {Primitive} from "app/view/cluster/types";

import {ResourceTreeItem} from "./ResourceTreeItem";

export const ResourceTreeItemPrimitive = ({
  primitive,
}: {
  primitive: Primitive;
}) => (
  <ResourceTreeItem
    resourceId={primitive.id}
    status={primitive.status}
    type={primitive.type}
    typeDescription={`${primitive.class}:${primitive.provider}`}
  />
);
