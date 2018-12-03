import React from "react";
import {
  withProps,
} from "recompose";

import Page from "./Page/Page";
import ClusterNavigation from "./ClusterNavigation/ClusterNavigation";

export const withClusterSidebar = withProps(({ clusterName }) => ({
  sidebarNavigation: <ClusterNavigation clusterName={clusterName} />,
}));

export default withClusterSidebar(Page);
