import React from "react";
import { PageSection } from "@patternfly/react-core";
import { useSelector } from "react-redux";

import { selectors } from "app/services/cluster";

import ResourceTree from "./ResourceTree";

const ResourceTreePage = () => {
  const cluster = useSelector(selectors.getCluster);
  return (
    <PageSection>
      <ResourceTree
        compact
        resourceTree={cluster.resourceTree}
        createResourceDetailUrl={
          ResourceTree.createResourceDetailUrl(cluster.urlName)
        }
      />

    </PageSection>
  );
};

export default ResourceTreePage;
