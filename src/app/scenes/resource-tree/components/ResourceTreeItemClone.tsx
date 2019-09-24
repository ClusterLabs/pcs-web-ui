import React from "react";

import { Link } from "react-router-dom";
import {
  DataList,
  DataListItem,
  DataListItemRow,
  DataListToggle,
  DataListItemCells,
  DataListCell,
  DataListContent,
} from "@patternfly/react-core";

import { Clone } from "app/services/cluster/types";

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
        <DataListItemCells
          dataListCells={[
            <DataListCell key={label}>
              <Link to={createResourceDetailUrl(clone.id)}>
                <strong>{label}</strong>
              </Link>
            </DataListCell>,
            <DataListCell key={`${label}.type`}>
              <span>Type </span>
              <strong>Clone</strong>
            </DataListCell>,
          ]}
        />
      </DataListItemRow>
      {expanded && (
        <DataListContent
          aria-label={`resources-of-group-${clone.id}`}
          noPadding
        >
          <DataList
            aria-label={`Group ${clone.id} resource list`}
            data-level="1"
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
          </DataList>
        </DataListContent>
      )}
    </DataListItem>
  );
};

export default ResourceTreeItemClone;
