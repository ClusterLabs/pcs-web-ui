import React from "react";
import { StyleSheet, css } from "@patternfly/react-styles";
import { Tooltip } from "@patternfly/react-core";

import * as pallete from "app/components/pallete";

const styles = StyleSheet.create({
  number: {
    "padding-left": "0.5rem",
  },
  aggregationBody: {
    "text-align": "center",
    "font-size": "130%",
    "font-weight": "bold",
    color: pallete.DARKEN_WHITE,
  },
});

const DashboardAggregationCard = ({ number, children, description }) => (
  <Tooltip content={description}>
    <div className={css(styles.aggregationBody)}>
      {children}
      <span className={css(styles.number)}>{number}</span>
    </div>
  </Tooltip>
);

export default DashboardAggregationCard;
