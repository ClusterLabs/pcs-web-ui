import React from "react";
import { Level, LevelItem } from "@patternfly/react-core";
import { ClusterIcon } from "@patternfly/react-icons";

import { StatusSign } from "app/components";
import { STATUS } from "app/services/cluster/status-constants";

import AggregationCard from "./DashboardAggregationCard";
import StatusIcon from "./DashboardClusterStatusIcon";

const AggregationLevel = ({ children, ...rest }) => (
  <LevelItem>
    <AggregationCard {...rest}>
      {children}
    </AggregationCard>
  </LevelItem>
);

const DashboardAggregations = ({ dashboard }) => {
  const clusterCount = status => (
    dashboard.clusterList.filter(cluster => cluster.status === status).length
  );
  return (
    <Level>
      <AggregationLevel number={dashboard.clusterList.length}>
        <StatusSign.Base
          icon={ClusterIcon}
          color="black"
          label="total clusters"
        />
      </AggregationLevel>
      <AggregationLevel number={clusterCount(STATUS.OK)}>
        <StatusIcon status={STATUS.OK} label="with ok state" />
      </AggregationLevel>
      <AggregationLevel number={clusterCount(STATUS.WARNING)}>
        <StatusIcon status={STATUS.WARNING} label="with warning" />
      </AggregationLevel>
      <AggregationLevel number={clusterCount(STATUS.ERROR)}>
        <StatusIcon status={STATUS.ERROR} label="with with error" />
      </AggregationLevel>
      <AggregationLevel number={clusterCount(STATUS.UNKNOWN)}>
        <StatusIcon status={STATUS.UNKNOWN} label="unknown status" />
      </AggregationLevel>
    </Level>
  );
};

export default DashboardAggregations;
