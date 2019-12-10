import React from "react";
import { Link } from "react-router-dom";
import {
  DataListItemCells,
  DataListCell,
} from "@patternfly/react-core";
import { ArrowCircleRightIcon } from "@patternfly/react-icons";

import { types } from "app/store";
import { StatusSign } from "app/view/common";
import { toLabel } from "app/view/utils";

import { useSelectedResource } from "./SelectedResourceContext";

const ResourceTreeItemDescription = ({
  resourceTreeItem,
  type,
  detailUrl,
  typeDescription = "",
}: {
  resourceTreeItem: types.cluster.ResourceTreeItem,
  type: string,
  detailUrl: string,
  typeDescription?: string,
}) => {
  const selectedResourceId = useSelectedResource();
  const isSelected = selectedResourceId === resourceTreeItem.id;
  return (
    <>
      <DataListItemCells
        dataListCells={[
          <DataListCell key={resourceTreeItem.id}>
            <Link to={detailUrl}>
              <strong>{resourceTreeItem.id}</strong>
            </Link>
          </DataListCell>,
          <DataListCell key={`${resourceTreeItem.id}.type`}>
            <span>Type </span>
            <strong>{type}</strong>
            {typeDescription && <span>{` (${typeDescription})`}</span>}
          </DataListCell>,
        ]}
      />
      <div className="ha-c-data-list__item-status">
        <StatusSign
          status={resourceTreeItem.statusSeverity}
          label={toLabel(resourceTreeItem.status)}
          showOkIco
        />
      </div>
      {selectedResourceId && (
        <div
          className={
            `ha-c-tree-view__selected-status${isSelected ? " ha-m-active" : ""}`
          }
        >
          <ArrowCircleRightIcon />
        </div>
      )}
    </>
  );
};

export default ResourceTreeItemDescription;
