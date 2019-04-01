import React from "react";
import { withRouter } from "react-router";
import { PageHeader as PfPageHeader } from "@patternfly/react-core";

import { connect } from "react-redux";
import { push } from "connected-react-router";

import PageToolbar from "./PageToolbar";

const withGoHome = connect(null, { goHome: () => push("/") });

const PageHeader = ({
  history,
  goHome,
  showNavToggle,
  onNavToggle,
}) => (
  <PfPageHeader
    logo="HA Cluster Management"
    toolbar={React.createElement(PageToolbar)}
    showNavToggle={showNavToggle}
    onNavToggle={onNavToggle}
    logoProps={{
      href: history.createHref({ pathname: "/" }),
      onClick: (e) => {
        e.preventDefault();
        goHome();
      },
    }}
  />
);

const HeaderWithPush = withGoHome(PageHeader);

export default withRouter(HeaderWithPush);
