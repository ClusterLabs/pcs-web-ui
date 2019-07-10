import React from "react";
import { Link } from "react-router-dom";
import { Table, StatusIco } from "app/components";

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

const getSummary = (expanded, setExpanded) => ({
  expandKey,
  itemsCount,
  summaryStatus,
  ...rest
}) => (
  <Table.ExpansionToggle
    expanded={expanded === expandKey}
    onClick={() => setExpanded(expanded !== expandKey ? expandKey : "")}
    {...rest}
  >
    {summaryStatus === StatusIco.STATUS_MAP.OK ? itemsCount : (
      <React.Fragment>
        <div>{itemsCount}</div>
        <div><StatusIco status={summaryStatus} /></div>
      </React.Fragment>
    )}
  </Table.ExpansionToggle>
);

const getDetail = expanded => ({ expandKey, children }) => (
  expanded !== expandKey ? null : (
    <Table.ExpandedContent colSpan={CELL_COUNT}>
      {children}
    </Table.ExpandedContent>
  )
);

const DashboardCluster = ({ cluster }) => {
  const [expanded, setExpanded] = React.useState("");

  const Summary = React.useCallback(
    getSummary(expanded, setExpanded),
    [expanded, setExpanded],
  );

  const Detail = React.useCallback(getDetail(expanded), [expanded]);

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
          itemsCount={cluster.issueList.length}
          summaryStatus={issuesToSummaryStatus(cluster.issueList)}
        />
        <Summary
          expandKey={COLUMNS.NODES}
          data-role="nodes-total"
          itemsCount={cluster.nodeList.length}
          summaryStatus={nodesToSummaryStatus(cluster.nodeList)}
        />
        <Summary
          expandKey={COLUMNS.RESOURCES}
          data-role="resources-total"
          itemsCount={cluster.resourceList.length}
          summaryStatus={resourcesToSummaryStatus(cluster.resourceList)}
        />
        <Summary
          expandKey={COLUMNS.FENCE_DEVICES}
          data-role="fence-devices-total"
          itemsCount={cluster.stonithList.length}
          summaryStatus={fenceDeviceToSummaryStatus(cluster.stonithList)}
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
