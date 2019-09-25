import React from "react";
import { Link } from "react-router-dom";
import {
  DataListItemCells,
  DataListCell,
} from "@patternfly/react-core";

import { StatusSign } from "app/common/components";
import { toLabel } from "app/common/utils";
import { ResourceTreeItem } from "app/services/cluster/types";

const ResourceTreeItemDescription = ({
  resourceTreeItem,
  type,
  detailUrl,
  typeDescription = "",
}: {
  resourceTreeItem: ResourceTreeItem,
  type: string,
  detailUrl: string,
  typeDescription?: string,
}) => (
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
  </>
);

export default ResourceTreeItemDescription;
