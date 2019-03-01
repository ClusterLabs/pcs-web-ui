import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { connect } from "react-redux";
import * as routerActions from "connected-react-router";
import { PageHeader as PfPageHeader } from "@patternfly/react-core";

import PageToolbar from "./PageToolbar";

const withPush = connect(null, { push: routerActions.push });

const PageHeader = ({
  history,
  push,
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
        push("/");
      },
    }}
  />
);

export default compose(withRouter, withPush)(PageHeader);
