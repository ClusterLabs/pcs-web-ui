import { compose, withStateHandlers } from "recompose";
import { global_breakpoint_md as breakpointMd } from "@patternfly/react-tokens";
import { PageSection, Title } from "@patternfly/react-core";

import PageView from "./PageView";

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
    onNavToggle: ({ isNavOpen }) => () => ({
      isNavOpen: !isNavOpen,
    }),
  },
);

const Page = compose(withNavigationToggle)(PageView);

Page.Section = PageSection;
Page.Title = Title;

export default Page;
