import React, { createElement } from "react";
import {
  Page as PfPage,
  PageSidebar,
  PageSection,
  Title,
} from "@patternfly/react-core";
import { global_breakpoint_md as breakpointMd } from "@patternfly/react-tokens";

import BackgroundImage from "./BackgroundImage";
import PageHeader from "./PageHeader";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

const SimplePage = ({ children }) => (
  <PfPage header={createElement(PageHeader)}>
    {children}
  </PfPage>
);

const PageWithSidebar = ({ children, sidebarNavigation }) => {
  const [isNavOpen, onNavToggle] = React.useState(
    typeof window !== "undefined"
    &&
    window.innerWidth >= parseInt(breakpointMd.value, 10),
  );
  return (
    <PfPage
      header={createElement(PageHeader, {
        showNavToggle: true,
        onNavToggle: () => onNavToggle(!isNavOpen),
      })}
      sidebar={createElement(PageSidebar, {
        nav: sidebarNavigation,
        isNavOpen,
      })}
    >
      {children}
    </PfPage>
  );
};

const Page = ({ children, sidebarNavigation = null, breadcrumbs = true }) => (
  <React.Fragment>
    <BackgroundImage />
    {
      sidebarNavigation
        ? (
          <PageWithSidebar sidebarNavigation={sidebarNavigation}>
            { breadcrumbs && <Breadcrumbs /> }
            {children}
          </PageWithSidebar>
        )
        : (
          <SimplePage>
            { breadcrumbs && <Breadcrumbs /> }
            {children}
          </SimplePage>
        )
    }
  </React.Fragment>
);

Page.Section = PageSection;
Page.Title = Title;

export default Page;
