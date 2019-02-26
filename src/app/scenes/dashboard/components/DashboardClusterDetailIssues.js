import React from "react";
import { Alert } from "@patternfly/react-core";
import { StyleSheet, css } from "@patternfly/react-styles";

import * as pallete from "app/components/pallete";
import { ISSUE } from "app/services/cluster/status-constants";

/* eslint-disable react/no-array-index-key */

const styles = StyleSheet.create({
  alertTail: {
    "margin-top": "0.6em",
  },
  alert: {
    "box-shadow": "none !important",
  },
  warning: {
    border: `1px solid ${pallete.WARNING_LIGHT}`,
  },
  error: {
    border: `1px solid ${pallete.ERROR_LIGHT}`,
  },
});

const mapSeverityToVariant = severity => (
  severity === ISSUE.ERROR ? "danger" : "warning"
);

const mapSeverityToColor = severity => (
  severity === ISSUE.ERROR ? styles.error : styles.warning
);

const issueKey = (issue, index) => `${index}:${issue.message}`;


const DashboardClusterDetailIssues = ({ issueList }) => (
  <React.Fragment>
    {issueList.map((issue, i) => (
      <Alert
        variant={mapSeverityToVariant(issue.severity)}
        title={issue.message}
        className={
          i > 0
            ? css(
              styles.alert,
              mapSeverityToColor(issue.severity),
              styles.alertTail,
            )
            : css(
              styles.alert,
              mapSeverityToColor(issue.severity),
            )
        }
        key={issueKey(issue, i)}
      />
    ))}
  </React.Fragment>
);

export default DashboardClusterDetailIssues;
