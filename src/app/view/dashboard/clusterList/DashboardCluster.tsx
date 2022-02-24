import { Cluster } from "app/view/cluster/types";
import { IssueList, Table } from "app/view/share";

import { DashboardClusterNodes } from "./DashboardClusterNodes";
import { DashboardClusterResources } from "./DashboardClusterResources";
import { DashboardClusterFenceDevices } from "./DashboardClusterFenceDevices";
import { DashboardClusterCellName } from "./DashboardClusterCellName";
import { DashboardClusterCellSummary } from "./DashboardClusterCellSummary";
import { DashboardClusterMenu } from "./DashboardClusterMenu";

const COLUMNS = {
  ISSUES: "ISSUES",
  NODES: "NODES",
  RESOURCES: "RESOURCES",
  FENCE_DEVICES: "FENCE_DEVICES",
  ACTIONS: "ACTIONS",
};
const EXPANDABLE_COLUMNS = Object.keys(COLUMNS);
const CELL_COUNT = 1 + EXPANDABLE_COLUMNS.length;

export const DashboardCluster = ({ cluster }: { cluster: Cluster }) => {
  const { expanded, Toggle, Content } = Table.Expansion.useExpansion({
    contentSpan: CELL_COUNT,
  });

  return (
    <Table.Body
      isExpanded={EXPANDABLE_COLUMNS.includes(expanded)}
      data-test={`cluster ${cluster.name}`}
    >
      <tr role="row" data-test="loaded">
        <DashboardClusterCellName clusterName={cluster.name} />
        <Toggle expandKey={COLUMNS.ISSUES} data-test="issues">
          <DashboardClusterCellSummary
            itemsCount={cluster.issueList.length}
            summaryStatus={cluster.summary.issuesSeverity}
          />
        </Toggle>
        <Toggle expandKey={COLUMNS.NODES} data-test="nodes">
          <DashboardClusterCellSummary
            itemsCount={cluster.nodeList.length}
            summaryStatus={cluster.summary.nodesSeverity}
          />
        </Toggle>
        <Toggle expandKey={COLUMNS.RESOURCES} data-test="resources">
          <DashboardClusterCellSummary
            itemsCount={cluster.resourceTree.length}
            summaryStatus={cluster.summary.resourcesSeverity}
          />
        </Toggle>
        <Toggle expandKey={COLUMNS.FENCE_DEVICES} data-test="fence-devices">
          <DashboardClusterCellSummary
            itemsCount={cluster.fenceDeviceList.length}
            summaryStatus={cluster.summary.fenceDevicesSeverity}
          />
        </Toggle>
        <td>
          <DashboardClusterMenu clusterName={cluster.name} />
        </td>
      </tr>
      <Content expandKey={COLUMNS.ISSUES}>
        <IssueList margin issueList={cluster.issueList} />
      </Content>
      <Content expandKey={COLUMNS.NODES}>
        <DashboardClusterNodes cluster={cluster} />
      </Content>
      <Content expandKey={COLUMNS.RESOURCES}>
        <DashboardClusterResources cluster={cluster} />
      </Content>
      <Content expandKey={COLUMNS.FENCE_DEVICES}>
        <DashboardClusterFenceDevices cluster={cluster} />
      </Content>
    </Table.Body>
  );
};
