import React from "react";
import { Link } from "react-router-dom";
import {
  DataListItem,
  DataListItemRow,
  DataListToggle,
  DataListItemCells,
  DataListCell,
} from "@patternfly/react-core";

const ResourceTreeItemLayout = ({
  label,
  detailUrl,
  toggleable = true,
  children,
}: React.PropsWithChildren<{
  label: string
  detailUrl: string,
  toggleable?: boolean,
}>) => (
  <DataListItem aria-labelledby={label}>
    <DataListItemRow>
      <DataListToggle
        id={`resource-tree-${label}`}
        aria-hidden={toggleable ? "false" : "true"}
      />
      <DataListItemCells
        dataListCells={[
          <DataListCell key={label}>
            <Link to={detailUrl}><strong>{label}</strong></Link>
          </DataListCell>,
        ]}
      />
    </DataListItemRow>
  </DataListItem>
);

export default ResourceTreeItemLayout;
