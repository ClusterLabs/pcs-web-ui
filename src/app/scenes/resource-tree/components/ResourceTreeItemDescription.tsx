import React from "react";
import { Link } from "react-router-dom";
import {
  DataListItemCells,
  DataListCell,
} from "@patternfly/react-core";

const ResourceTreeItemDescription = ({
  itemId,
  type,
  detailUrl,
  typeDescription = "",
}: {
  itemId: string,
  type: string,
  detailUrl: string,
  typeDescription?: string,
}) => (
  <DataListItemCells
    dataListCells={[
      <DataListCell key={itemId}>
        <Link to={detailUrl}>
          <strong>{itemId}</strong>
        </Link>
      </DataListCell>,
      <DataListCell key={`${itemId}.type`}>
        <span>Type </span>
        <strong>{type}</strong>
        {typeDescription && <span>{` (${typeDescription})`}</span>}
      </DataListCell>,
    ]}
  />
);

export default ResourceTreeItemDescription;
