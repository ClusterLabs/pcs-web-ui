import React from "react";
import { Page, PageSidebar } from "@patternfly/react-core";
import { global_breakpoint_md as breakpointMd } from "@patternfly/react-tokens";

import ClusterNavigation from "./ClusterNavigation";
import BackgroundImage from "./BackgroundImage";
import PageHeader from "./PageHeader";
import Breadcrumbs from "./Breadcrumbs";

const ClusterPage = ({ children, clusterUrlName }: React.PropsWithChildren<{
  clusterUrlName: string,
}>) => {
  const [isNavOpen, onNavToggle] = React.useState(
    typeof window !== "undefined"
    &&
    window.innerWidth >= parseInt(breakpointMd.value, 10),
  );
  return (
    <React.Fragment>
      <BackgroundImage />
      <Page
        header={(
          <PageHeader
            showNavToggle
            onNavToggle={() => onNavToggle(!isNavOpen)}
          />
        )}
        sidebar={(
          <PageSidebar
            nav={(<ClusterNavigation clusterUrlName={clusterUrlName} />)}
            isNavOpen={isNavOpen}
          />
        )}
      >
        <Breadcrumbs />
        {children}
      </Page>
    </React.Fragment>
  );
};

export default ClusterPage;
