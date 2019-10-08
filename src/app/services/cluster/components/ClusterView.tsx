import React from "react";
import { PageSection } from "@patternfly/react-core";

import { Page, Spinner } from "app/common/components";

import useClusterState from "../useClusterState";

const ClusterView = (
  {
    clusterUrlName,
    pageSectionClassName = "",
    tabs,
    children,
  }: React.PropsWithChildren<{
    clusterUrlName: string;
    pageSectionClassName?: string;
    tabs: JSX.Element;
  }>,
) => {
  const { dataLoaded } = useClusterState(clusterUrlName);
  return (
    <Page>
      <PageSection variant="light">
        {tabs}
      </PageSection>
      <PageSection className={pageSectionClassName}>
        {!dataLoaded && <Spinner text="Loading data" />}
        {dataLoaded && children}
      </PageSection>
    </Page>
  );
};

export default ClusterView;
