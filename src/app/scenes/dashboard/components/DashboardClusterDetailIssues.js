import React from "react";
import { Alert } from "@patternfly/react-core";
import { StyleSheet, css } from "@patternfly/react-styles";
import {
  global_warning_color_100 as warningBorderColor,
} from "@patternfly/react-tokens";

const styles = StyleSheet.create({
  alertTail: {
    "margin-top": "0.6em",
  },
  alert: {
    "box-shadow": "none !important",
    border: `1px solid ${warningBorderColor.var}`,
  },
});

const DashboardClusterDetailIssues = ({ warningList }) => (
  <React.Fragment>
    {warningList.map((warning, i) => (
      <Alert
        variant="warning"
        title={warning}
        className={
          i > 0
            ? css(styles.alert, styles.alertTail)
            : css(styles.alert)
        }
        key={warning}
      />
    ))}
  </React.Fragment>
);

export default DashboardClusterDetailIssues;
