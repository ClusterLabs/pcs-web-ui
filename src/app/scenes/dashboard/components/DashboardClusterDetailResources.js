import React from "react";
import { StyleSheet, css } from "@patternfly/react-styles";
import {
  global_warning_color_200 as warningColor,
  global_success_color_200 as successColor,
} from "@patternfly/react-tokens";

import { RESOURCE } from "app/services/cluster/status-constants";
import { mapConstants } from "app/utils";

import DashboardClusterDetailItems from "./DashboardClusterDetailItems";

const styles = StyleSheet.create({
  success: {
    color: successColor.var,
  },
  warning: {
    color: warningColor.var,
  },
  unknown: {
    color: warningColor.var,
  },
});

const { STATUS } = RESOURCE;

const getStatusText = mapConstants("unknown", {
  [STATUS.RUNNING]: "running",
  [STATUS.BLOCKED]: "blocked",
});

const getStatusClass = mapConstants(styles.unknown, {
  [STATUS.RUNNING]: styles.success,
  [STATUS.BLOCKED]: styles.warning,
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

const DashboardClusterDetailsResources = ({ resourceList }) => (
  <DashboardClusterDetailItems
    columns={["Name", "Status"]}
    itemList={resourceList}
    isItemOk={resource => resource.status === STATUS.RUNNING}
    compareItems={compareItems}
    itemToRow={resource => [
      resource.id,
      {
        title: getStatusText(resource.status),
        props: { className: css(getStatusClass(resource.status)) },
      },
    ]}
    itemType="Resources"
    noItemMessage="No resource"
  />
);

export default DashboardClusterDetailsResources;
