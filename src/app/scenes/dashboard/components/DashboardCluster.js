import React from "react";
import { Link } from "react-router-dom";
import { Table } from "app/components";

import DashboardItemsSummary from "./DashboardItemsSummary";
import DashboardNodeList, { nodesToSummaryStatus }
  from "./DashboardNodeList";
import DashboardResourceList, { resourcesToSummaryStatus }
  from "./DashboardResourceList";
import DashboardFenceDeviceList, { fenceDeviceToSummaryStatus }
  from "./DashboardFenceDeviceList";
import DashboardIssueList, { issuesToSummaryStatus }
  from "./DashboardIssueList";

const COLUMNS = {
  ISSUES: "ISSUES",
  NODES: "NODES",
  RESOURCES: "RESOURCES",
  FENCE_DEVICES: "FENCE_DEVICES",
};
const EXPANDABLE_COLUMNS = Object.keys(COLUMNS);
const CELL_COUNT = 1 + EXPANDABLE_COLUMNS.length;

const DashboardCluster = ({ cluster }) => {
  const [expanded, setExpanded] = React.useState("");

  const Summary = React.useCallback(
    ({
      expandKey,
      children,
      items,
      itemsToStatus,
      ...rest
    }) => (
      <Table.ExpansionToggle
        expanded={expanded === expandKey}
        onClick={() => setExpanded(expanded !== expandKey ? expandKey : "")}
        {...rest}
      >
        <DashboardItemsSummary
          items={items}
          itemsToStatus={itemsToStatus}
        />
      </Table.ExpansionToggle>
    ),
    [expanded, setExpanded],
  );

  const Detail = React.useCallback(
    ({ expandKey, children, padding = false }) => (
      expanded !== expandKey ? null : (
        <Table.ExpandedContent colSpan={CELL_COUNT} padding={padding}>
          {children}
        </Table.ExpandedContent>
      )
    ),
    [expanded],
  );

  return (
    <Table.Body
      isExpanded={EXPANDABLE_COLUMNS.includes(expanded)}
      data-role="cluster"
      data-role-key={cluster.name}
    >
      <tr>
        <th>
          <Link
            id={`dashboard-cluster-${cluster.name}`}
            data-role="detail-link"
            to={`/cluster/${cluster.urlName}`}
          >
            {cluster.name}
          </Link>
        </th>
        <Summary
          expandKey={COLUMNS.ISSUES}
          data-role="issues-total"
          items={cluster.issueList}
          itemsToStatus={issuesToSummaryStatus}
        />
        <Summary
          expandKey={COLUMNS.NODES}
          data-role="nodes-total"
          items={cluster.nodeList}
          itemsToStatus={nodesToSummaryStatus}
        />
        <Summary
          expandKey={COLUMNS.RESOURCES}
          data-role="resources-total"
          items={cluster.resourceList}
          itemsToStatus={resourcesToSummaryStatus}
        />
        <Summary
          expandKey={COLUMNS.FENCE_DEVICES}
          data-role="fence-devices-total"
          items={cluster.stonithList}
          itemsToStatus={fenceDeviceToSummaryStatus}
        />
      </tr>
      <Detail expandKey={COLUMNS.ISSUES}>
        <DashboardIssueList issueList={cluster.issueList} />
      </Detail>
      <Detail expandKey={COLUMNS.NODES}>
        <DashboardNodeList nodeList={cluster.nodeList} />
      </Detail>
      <Detail expandKey={COLUMNS.RESOURCES}>
        <DashboardResourceList resourceList={cluster.resourceList} />
      </Detail>
      <Detail expandKey={COLUMNS.FENCE_DEVICES}>
        <DashboardFenceDeviceList fenceDeviceList={cluster.stonithList} />
      </Detail>
    </Table.Body>
  );
};

export default DashboardCluster;
