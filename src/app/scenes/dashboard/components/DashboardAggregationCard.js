import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
} from "@patternfly/react-core";
import { StyleSheet, css } from "@patternfly/react-styles";

const styles = StyleSheet.create({
  aggregationBody: {
    "text-align": "center",
    "font-size": "130%",
    "font-weight": "bold",
  },
});


const DashboardAggregationCard = ({ number, children }) => (
  <Card>
    <CardHeader>
      {children}
    </CardHeader>
    <CardBody className={css(styles.aggregationBody)}>
      <span className={css(styles.number)}>{number}</span>
    </CardBody>
  </Card>
);

export default DashboardAggregationCard;
