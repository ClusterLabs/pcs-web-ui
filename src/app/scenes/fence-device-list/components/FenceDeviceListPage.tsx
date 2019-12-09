import React from "react";
import { PageSection } from "@patternfly/react-core";

import { types } from "app/store";

import FenceDeviceList from "./FenceDeviceList";

const FenceDeviceListPage = ({ cluster, urlPrefix }:{
  cluster: types.cluster.ClusterState;
  urlPrefix: string;
}) => {
  return (
    <PageSection>
      <FenceDeviceList fenceDeviceList={cluster.fenceDeviceList} />
    </PageSection>
  );
};

export default FenceDeviceListPage;
