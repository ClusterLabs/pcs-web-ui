import React from "react";

import { RESOURCE } from "app/services/cluster/status-constants";
import { mapConstants } from "app/utils";
import { StatusSign } from "app/components";

import DashboardClusterDetailItems from "./DashboardClusterDetailItems";
import DashboardIssueTooltip from "./DashboardIssueTooltip";

const { STATUS } = RESOURCE;

const getStatusSign = mapConstants(StatusSign.Unknown, {
  [STATUS.RUNNING]: StatusSign.Running,
  [STATUS.BLOCKED]: StatusSign.Blocked,
  [STATUS.FAILED]: StatusSign.Failed,
});

const compareItems = (a, b) => {
  if (a.status === STATUS.RUNNING && b.status !== STATUS.RUNNING) {
    return 1;
  }

  if (a.status !== STATUS.RUNNING && b.status === STATUS.RUNNING) {
    return -1;
  }

  return a.name.toUpperCase() - b.name.toUpperCase();
};

const withIssues = (resource, content) => (
  resource.issueList.length > 0
    ? (
      <DashboardIssueTooltip issueList={resource.issueList}>
        <span>{content}</span>
      </DashboardIssueTooltip>
    )
    : content
);

const DashboardClusterDetailsResources = ({
  resourceList,
  isStonith = false,
}) => (
  <DashboardClusterDetailItems
    columns={["Name", "Status"]}
    itemList={resourceList}
    isItemOk={resource => resource.status === STATUS.RUNNING}
    compareItems={compareItems}
    itemToRow={resource => [
      {
        title: withIssues(resource, resource.id),
      },
      {
        title: withIssues(
          resource,
          React.createElement(getStatusSign(resource.status)),
        ),
      },
    ]}
    itemType={isStonith ? "Fence devices" : "Resources"}
    noItemMessage={isStonith ? "No fence devices" : "No resources"}
  />
);

export default DashboardClusterDetailsResources;
