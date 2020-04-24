import React from "react";
import { Spinner } from "@patternfly/react-core";

import { Link, Table } from "app/view/common";

export const DashboardLoadingCluster = ({
  clusterUrlName,
}: {
  clusterUrlName: string;
}) => {
  return (
    <Table.Body data-test={`cluster-loading ${clusterUrlName}`}>
      <tr role="row">
        <th role="rowheader" data-test="name">
          <Link
            id={`dashboard-cluster-${clusterUrlName}`}
            to={`/cluster/${clusterUrlName}`}
          >
            {clusterUrlName}
          </Link>
        </th>
        <td colSpan={4}>
          <Spinner size="md" />
        </td>
      </tr>
    </Table.Body>
  );
};
