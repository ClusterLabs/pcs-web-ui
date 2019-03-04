import React from "react";
import { StyleSheet, css } from "@patternfly/react-styles";
import {
  global_warning_color_200 as warningColor,
} from "@patternfly/react-tokens";

/* eslint-disable react/no-array-index-key */

const styles = StyleSheet.create({
  warningList: {
    "margin-left": "1.2em",
  },
  warningItem: {
    color: warningColor.var,
    "list-style-type": "disc",
  },
});

const DashboardClusterWarning = ({ warningList }) => (
  <ul className={css(styles.warningList)}>
    {
      warningList.map((warning, i) => (
        <li key={i} className={css(styles.warningItem)}>
          {warning}
        </li>
      ))
    }
  </ul>
);

export default DashboardClusterWarning;
