import React from "react";
import { Alert } from "@patternfly/react-core";
import { StyleSheet, css } from "@patternfly/react-styles";
import {
  global_warning_color_100 as warningBorderColor,
} from "@patternfly/react-tokens";

import { ISSUE } from "app/services/cluster/status-constants";

/* eslint-disable react/no-array-index-key */

const styles = StyleSheet.create({
  alertTail: {
    "margin-top": "0.6em",
  },
  alert: {
    "box-shadow": "none !important",
    border: `1px solid ${warningBorderColor.var}`,
  },
});

const mapSeverityToVariant = severity => (
  severity === ISSUE.ERROR ? "danger" : "warning"
);


const DashboardClusterDetailIssues = ({ issueList }) => (
  <React.Fragment>
    {issueList.map((issue, i) => (
      <Alert
        variant={mapSeverityToVariant(issue.severity)}
        title={issue.message}
        className={
          i > 0
            ? css(styles.alert, styles.alertTail)
            : css(styles.alert)
        }
        key={`${i}:${issue.message}`}
      />
    ))}
  </React.Fragment>
);

export default DashboardClusterDetailIssues;
