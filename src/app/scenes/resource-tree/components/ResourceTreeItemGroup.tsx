import React from "react";
import {
  DataListItem,
  DataListItemRow,
  DataListToggle,
} from "@patternfly/react-core";

import { Group } from "app/services/cluster/types";

import ResourceTreeItemDescription from "./ResourceTreeItemDescription";
import ResourceTreeNested from "./ResourceTreeNested";
import ResourceTreeItemPrimitive from "./ResourceTreeItemPrimitive";

const ResourceTreeItemGroup = (
  { group, createResourceDetailUrl, nestedLevel = 0 }: {
    group: Group,
    createResourceDetailUrl: (id: string) => string,
    nestedLevel?: number,
  },
) => {
  const [expanded, setExpanded] = React.useState(false);
  const label = group.id;
  return (
    <DataListItem aria-labelledby={label} isExpanded={expanded}>
      <DataListItemRow>
        <DataListToggle
          id={`resource-tree-${label}`}
          isExpanded={expanded}
          onClick={() => setExpanded(!expanded)}
        />
        <ResourceTreeItemDescription
          itemId={group.id}
          detailUrl={createResourceDetailUrl(group.id)}
          type="Group"
        />
      </DataListItemRow>
      {expanded && (
        <ResourceTreeNested
          ariaLabel={`Group ${group.id}: resources`}
          nestingDepth={1 + nestedLevel}
        >
          {group.resources.map(resource => (
            <ResourceTreeItemPrimitive
              key={resource.id}
              resource={resource}
              createResourceDetailUrl={createResourceDetailUrl}
            />
          ))}
        </ResourceTreeNested>
      )}
    </DataListItem>
  );
};

export default ResourceTreeItemGroup;
