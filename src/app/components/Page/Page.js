import React, { createElement } from "react";
import {
  Page as PfPage,
  BackgroundImage,
  PageSidebar,
  PageSection,
  Title,
} from "@patternfly/react-core";
import { withStateHandlers } from "recompose";
import { global_breakpoint_md as breakpointMd } from "@patternfly/react-tokens";

import PageHeader from "./PageHeader";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

const withNavigationToggle = withStateHandlers(
  {
    // Set initial isNavOpen state based on window width
    isNavOpen: (
      typeof window !== "undefined"
      &&
      window.innerWidth >= parseInt(breakpointMd.value, 10)
    ),
  },
  {
    onNavToggle: ({ isNavOpen }) => () => ({ isNavOpen: !isNavOpen }),
  },
);

const SimplePage = ({ children }) => (
  <PfPage header={createElement(PageHeader)}>
    {children}
  </PfPage>
);

const PageWithSidebarView = ({
  children,
  onNavToggle,
  isNavOpen,
  sidebarNavigation,
}) => (
  <PfPage
    header={createElement(PageHeader, { showNavToggle: true, onNavToggle })}
    sidebar={createElement(PageSidebar, { nav: sidebarNavigation, isNavOpen })}
  >
    {children}
  </PfPage>
);

const PageWithSidebar = withNavigationToggle(PageWithSidebarView);

const Page = ({ children, sidebarNavigation }) => (
  <React.Fragment>
    <BackgroundImage src={{}} />
    {
      sidebarNavigation
        ? (
          <PageWithSidebar sidebarNavigation={sidebarNavigation}>
            <Breadcrumbs />
            {children}
          </PageWithSidebar>
        )
        : (
          <SimplePage>
            <Breadcrumbs />
            {children}
          </SimplePage>
        )
    }
  </React.Fragment>
);

Page.Section = PageSection;
Page.Title = Title;

export default Page;
