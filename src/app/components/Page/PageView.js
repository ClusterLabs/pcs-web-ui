import React from "react";

import {
  Page as PfPage,
  BackgroundImage,
  PageHeader,
  PageSidebar,
} from "@patternfly/react-core";

import PageToolbar from "./PageToolbar";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

const PageView = (
  {
    children,
    onNavToggle,
    isNavOpen,
    sidebarNavigation = {},
  },
) => (
  <React.Fragment>
    <BackgroundImage src={{}} />
    {
      Object.keys(sidebarNavigation).length > 0
        ? (
          <PfPage
            header={(
              <PageHeader
                logo="HA Cluster Management"
                toolbar={<PageToolbar />}
                showNavToggle
                onNavToggle={onNavToggle}
              />
            )}
            sidebar={
              <PageSidebar nav={sidebarNavigation} isNavOpen={isNavOpen} />
            }
          >
            <Breadcrumbs />
            {children}
          </PfPage>
        )
        : (
          <PfPage
            header={(
              <PageHeader
                logo="HA Cluster Management"
                toolbar={<PageToolbar />}
              />
            )}
          >
            <Breadcrumbs />
            {children}
          </PfPage>
        )
    }

  </React.Fragment>
);

export default PageView;
