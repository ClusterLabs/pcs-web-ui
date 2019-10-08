import React from "react";
import { PageSection } from "@patternfly/react-core";

import { ClusterState } from "app/services/cluster/types";

import NodeList from "./NodeList";

const NodeListPage = ({ cluster, urlPrefix }:{
  cluster: ClusterState;
  urlPrefix: string;
}) => (
  <PageSection>
    <NodeList nodeList={cluster.nodeList} />
  </PageSection>
);

export default NodeListPage;
