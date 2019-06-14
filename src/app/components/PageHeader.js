import React from "react";
import { withRouter } from "react-router";
import { PageHeader as PfPageHeader } from "@patternfly/react-core";

import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

import PageToolbar from "./PageToolbar";

const PageHeader = ({ history, showNavToggle, onNavToggle }) => {
  const dispatch = useDispatch();
  return (
    <PfPageHeader
      logo="HA Cluster Management"
      toolbar={React.createElement(PageToolbar)}
      showNavToggle={showNavToggle}
      onNavToggle={onNavToggle}
      logoProps={{
        href: history.createHref({ pathname: "/" }),
        onClick: (e) => {
          e.preventDefault();
          dispatch(push("/"));
        },
      }}
    />
  );
};

export default withRouter(PageHeader);
