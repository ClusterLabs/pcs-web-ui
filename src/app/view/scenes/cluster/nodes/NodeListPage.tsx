import React from "react";
import { PageSection } from "@patternfly/react-core";

import { types } from "app/store";

import { NodeList } from "./NodeList";

export const NodeListPage = ({ cluster, urlPrefix }:{
  cluster: types.cluster.ClusterState;
  urlPrefix: string;
}) => (
  <PageSection>
    <NodeList nodeList={cluster.nodeList} />
  </PageSection>
);
