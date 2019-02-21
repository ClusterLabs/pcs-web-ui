import React from "react";
import { StyleSheet, css } from "@patternfly/react-styles";
import {
  global_warning_color_200 as warningColor,
  global_success_color_200 as successColor,
} from "@patternfly/react-tokens";

import { NODE } from "app/services/cluster/status-constants";
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
  card: {
    "margin-top": "1rem!important",
  },
});

const { STATUS, QUORUM } = NODE;

const getStatusText = mapConstants("unknown", {
  [STATUS.ONLINE]: "online",
  [STATUS.OFFLINE]: "offline",
});

const getStatusClass = mapConstants(styles.unknown, {
  [STATUS.ONLINE]: styles.success,
  [STATUS.OFFLINE]: styles.warning,
});

const getQuorumText = mapConstants("unknown", {
  [QUORUM.YES]: "yes",
  [QUORUM.NO]: "no",
});

const getQuorumClass = mapConstants(styles.unknown, {
  [QUORUM.YES]: styles.success,
  [QUORUM.NO]: styles.warning,
});

const compareItems = (a, b) => {
  if (a.status === STATUS.ONLINE && b.status !== STATUS.ONLINE) {
    return 1;
  }

  if (a.status !== STATUS.ONLINE && b.status === STATUS.ONLINE) {
    return -1;
  }

  if (a.quorum === QUORUM.YES && b.quorum !== QUORUM.YES) {
    return 1;
  }

  if (a.quorum !== QUORUM.YES && b.quorum === QUORUM.YES) {
    return -1;
  }

  return a.name.toUpperCase() - b.name.toUpperCase();
};

const DashboardClusterDetailNodes = ({ nodeList }) => (
  <DashboardClusterDetailItems
    columns={["Name", "Status", "Quorum"]}
    itemList={nodeList}
    isItemOk={node => (
      node.status === STATUS.ONLINE
      &&
      node.quorum === QUORUM.YES
    )}
    compareItems={compareItems}
    itemToRow={node => [
      node.name,
      {
        title: getStatusText(node.status),
        props: { className: css(getStatusClass(node.status)) },
      },
      {
        title: getQuorumText(node.quorum),
        props: { className: css(getQuorumClass(node.quorum)) },
      },
    ]}
    itemType="Nodes"
    noItemMessage="No node"
  />
);

export default DashboardClusterDetailNodes;
