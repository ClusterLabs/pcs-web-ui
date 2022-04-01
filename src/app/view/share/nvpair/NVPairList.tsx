import * as React from "react";

import { EmptyStateNoItem } from "app/view/share/emptyState";
import { Table } from "app/view/share/table";
import { NVPair } from "app/view/cluster/types";

import { NVPairMenu } from "./NVPairMenu";

export const NVPairList = ({
  nvPairList,
  owner,
}: {
  nvPairList: NVPair[];
  owner: React.ComponentProps<typeof NVPairMenu>["owner"];
}) => {
  if (nvPairList.length === 0) {
    return (
      <EmptyStateNoItem
        title="No attribute here."
        message="No attribute has been added."
      />
    );
  }

  return (
    <Table>
      <Table.Body data-test="nvpair-list">
        {nvPairList.map(attr => (
          <tr key={attr.id} data-test={`nvpair ${attr.id}`}>
            <td data-label="name" data-test="name">
              {attr.name}
            </td>
            <td data-label="value" data-test="value">
              {attr.value}
            </td>
            <td data-label="Menu">
              <NVPairMenu attr={attr} owner={owner} />
            </td>
          </tr>
        ))}
      </Table.Body>
    </Table>
  );
};
