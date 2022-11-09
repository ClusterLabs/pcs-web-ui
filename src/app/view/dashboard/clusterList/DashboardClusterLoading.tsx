import {Spinner} from "@patternfly/react-core";

import {Table} from "app/view/share";

import {DashboardClusterCellName} from "./DashboardClusterCellName";

export const DashboardClusterLoading = ({
  clusterName,
}: {
  clusterName: string;
}) => {
  return (
    <Table.Body data-test={`cluster ${clusterName}`}>
      <tr role="row" data-test="loading">
        <DashboardClusterCellName clusterName={clusterName} status="unknown" />
        <td colSpan={4}>
          <Spinner size="md" />
        </td>
      </tr>
    </Table.Body>
  );
};
