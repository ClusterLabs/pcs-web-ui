import React from "react";

import {Table} from "app/view/share";

import {DashboardClusterCellName} from "./DashboardClusterCellName";

export const DashboardClusterLoading = ({
  clusterName,
  children,
}: {
  clusterName: string;
  children: React.ReactNode;
}) => {
  return (
    <Table.Body data-test={`cluster ${clusterName}`}>
      <tr role="row" data-test="loading">
        <DashboardClusterCellName clusterName={clusterName} status="unknown" />
        <td colSpan={4}>{children}</td>
      </tr>
    </Table.Body>
  );
};
