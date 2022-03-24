import * as React from "react";

import { EmptyStateNoItem } from "app/view/share/emptyState";
import { Table } from "app/view/share/table";
import { NVPair } from "app/view/cluster/types";

import { UtilizationAttrMenu } from "./UtilizationAttrMenu";

export const UtilizationAttrs = ({
  utilizationAttrs,
  owner,
}: {
  utilizationAttrs: NVPair[];
  owner: React.ComponentProps<typeof UtilizationAttrMenu>["owner"];
}) => {
  if (utilizationAttrs.length === 0) {
    return (
      <EmptyStateNoItem
        title="No attribute here."
        message="No attribute has been added."
      />
    );
  }

  return (
    <Table>
      <Table.Body data-test="utilization-attr-list">
        {utilizationAttrs.map(attr => (
          <tr key={attr.id} data-test={`utilization-attr ${attr.id}`}>
            <td data-label="name" data-test="name">
              {attr.name}
            </td>
            <td data-label="value" data-test="value">
              {attr.value}
            </td>
            <td data-label="Menu">
              <UtilizationAttrMenu attr={attr} owner={owner} />
            </td>
          </tr>
        ))}
      </Table.Body>
    </Table>
  );
};
