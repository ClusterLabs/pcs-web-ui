import React from "react";
import { ClusterIcon } from "@patternfly/react-icons";

import { StatusSign } from "app/components";
import { STATUS } from "app/services/cluster/status-constants";
import { StyleSheet, css } from "@patternfly/react-styles";

import AggregationCard from "./DashboardAggregationCard";
import StatusIcon from "./DashboardClusterStatusIcon";

const styles = StyleSheet.create({
  aggregation: {
    float: "left",
    "padding-left": "2rem",
    "padding-right": "2rem",
  },
});

const AggregationLevel = ({ children, ...rest }) => (
  <div className={css(styles.aggregation)}>
    <AggregationCard {...rest}>
      {children}
    </AggregationCard>
  </div>
);

const DashboardAggregations = ({ dashboard }) => {
  const clusterCount = status => (
    dashboard.clusterList.filter(cluster => cluster.status === status).length
  );
  return (
    <React.Fragment>
      <AggregationLevel
        number={dashboard.clusterList.length}
        description="Clusters total"
      >
        <StatusSign.Base
          icon={ClusterIcon}
          color="#d1d1d1"
        />
      </AggregationLevel>
      <AggregationLevel
        number={clusterCount(STATUS.OK)}
        description="Clusters with OK status"
      >
        <StatusIcon status={STATUS.OK} label="" />
      </AggregationLevel>
      <AggregationLevel
        number={clusterCount(STATUS.WARNING)}
        description="Clusters with warnings"
      >
        <StatusIcon status={STATUS.WARNING} />
      </AggregationLevel>
      <AggregationLevel
        number={clusterCount(STATUS.ERROR)}
        description="Clusters with errors"
      >
        <StatusIcon status={STATUS.ERROR} />
      </AggregationLevel>
      <AggregationLevel
        number={clusterCount(STATUS.UNKNOWN)}
        description="Clusters with unknown status"
      >
        <StatusIcon status={STATUS.UNKNOWN} />
      </AggregationLevel>
    </React.Fragment>
  );
};

export default DashboardAggregations;
