import React from "react";

import {
  DataListItem,
  DataListItemRow,
  DataListToggle,
} from "@patternfly/react-core";

import { Clone } from "app/services/cluster/types";

import ResourceTreeItemDescription from "./ResourceTreeItemDescription";
import ResourceTreeNested from "./ResourceTreeNested";
import ResourceTreeItemPrimitive from "./ResourceTreeItemPrimitive";
import ResourceTreeItemGroup from "./ResourceTreeItemGroup";


const ResourceTreeItemClone = ({ clone, createResourceDetailUrl }: {
  clone: Clone,
  createResourceDetailUrl: (id: string) => string,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const label = clone.id;
  return (
    <DataListItem aria-labelledby={label} isExpanded={expanded}>
      <DataListItemRow>
        <DataListToggle
          id={`resource-tree-${label}`}
          isExpanded={expanded}
          onClick={() => setExpanded(!expanded)}
        />
        <ResourceTreeItemDescription
          itemId={clone.id}
          detailUrl={createResourceDetailUrl(clone.id)}
          type="Clone"
        />
      </DataListItemRow>
      {expanded && (
        <ResourceTreeNested
          ariaLabel={`Clone ${clone.id}: member`}
          nestingDepth={1}
        >
          {clone.member.itemType === "resource" && (
            <ResourceTreeItemPrimitive
              key={clone.member.id}
              resource={clone.member}
              createResourceDetailUrl={createResourceDetailUrl}
            />
          )}
          {clone.member.itemType === "group" && (
            <ResourceTreeItemGroup
              key={clone.member.id}
              group={clone.member}
              createResourceDetailUrl={createResourceDetailUrl}
              nestedLevel={1}
            />
          )}
        </ResourceTreeNested>
      )}
    </DataListItem>
  );
};

export default ResourceTreeItemClone;
