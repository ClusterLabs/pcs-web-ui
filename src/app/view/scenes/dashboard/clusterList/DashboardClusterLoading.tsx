import React from "react";
import { Spinner } from "@patternfly/react-core";

import { Table } from "app/view/common";
import { DashboardClusterCellName } from "./DashboardClusterCellName";

export const DashboardClusterLoading = ({
  clusterUrlName,
}: {
  clusterUrlName: string;
}) => {
  return (
    <Table.Body data-test={`cluster-loading ${clusterUrlName}`}>
      <tr role="row">
        <DashboardClusterCellName clusterUrlName={clusterUrlName} />
        <td colSpan={4}>
          <Spinner size="md" />
        </td>
      </tr>
    </Table.Body>
  );
};
