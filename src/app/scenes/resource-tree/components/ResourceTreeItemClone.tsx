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
  const label = clone.id;
  return (
    <DataListItem aria-labelledby={label} isExpanded>
      <DataListItemRow>
        <DataListToggle id={`resource-tree-${label}`} />
        <DataListItemCells
          dataListCells={[
            <DataListCell key={label}>
              <Link to={createResourceDetailUrl(clone.id)}>
                <strong>{label}</strong>
              </Link>
            </DataListCell>,
            <DataListCell key={`${label}.type`}>
              <span>Type </span>
              <strong>Group</strong>
            </DataListCell>,
          ]}
        />
      </DataListItemRow>
      <DataListContent aria-label={`resources-of-group-${clone.id}`}>
        <DataList aria-label={`Group ${clone.id} resource list`}>
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
            />
          )}
        </DataList>
      </DataListContent>
    </DataListItem>
  );
};

export default ResourceTreeItemClone;
