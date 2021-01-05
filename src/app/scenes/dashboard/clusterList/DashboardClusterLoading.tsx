import React from "react";
import { Spinner } from "@patternfly/react-core";

import { Table } from "app/view";

import { DashboardClusterCellName } from "./DashboardClusterCellName";

export const DashboardClusterLoading: React.FC<{ clusterName: string }> = ({
  clusterName,
}) => {
  return (
    <Table.Body data-test={`cluster-loading ${clusterName}`}>
      <tr role="row">
        <DashboardClusterCellName clusterName={clusterName} />
        <td colSpan={4}>
          <Spinner size="md" />
        </td>
      </tr>
    </Table.Body>
  );
};
