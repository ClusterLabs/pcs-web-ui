import React from "react";
import { PageSection } from "@patternfly/react-core";

import { ClusterState } from "app/services/cluster/types";

import FenceDeviceList from "./FenceDeviceList";

const FenceDeviceListPage = ({ cluster, urlPrefix }:{
  cluster: ClusterState;
  urlPrefix: string;
}) => {
  return (
    <PageSection>
      <FenceDeviceList fenceDeviceList={cluster.fenceDeviceList} />
    </PageSection>
  );
};

export default FenceDeviceListPage;
