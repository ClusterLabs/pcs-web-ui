import React from "react";
import { withRouter } from "react-router";
import { compose, withProps } from "recompose";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { PageHeader as PfPageHeader } from "@patternfly/react-core";

import PageToolbar from "./PageToolbar";

const withPush = connect(null, { push });

/* eslint-disable no-shadow */
const withAnchorProps = withProps(({ history, push }) => ({
  anchorProps: {
    href: history.createHref({ pathname: "/" }),
    onClick: (e) => {
      e.preventDefault();
      push("/");
    },
  },
}));

const PageHeader = ({ anchorProps, showNavToggle, onNavToggle }) => (
  <PfPageHeader
    logo="HA Cluster Management"
    toolbar={React.createElement(PageToolbar)}
    showNavToggle={showNavToggle}
    onNavToggle={onNavToggle}
    logoProps={anchorProps}
  />
);

export default compose(withRouter, withPush, withAnchorProps)(PageHeader);
