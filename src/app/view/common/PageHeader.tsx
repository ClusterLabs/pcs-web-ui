import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { PageHeader as PfPageHeader } from "@patternfly/react-core";
import { History } from "history";

import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

import { PageToolbar } from "./PageToolbar";

interface Props extends RouteComponentProps {
  history: History,
  showNavToggle?: boolean,
  onNavToggle?: () => void,
}

const PageHeaderComponent = (
  { history, showNavToggle, onNavToggle }: Props,
) => {
  const dispatch = useDispatch();
  return (
    <PfPageHeader
      logo="HA Cluster Management"
      toolbar={<PageToolbar />}
      showNavToggle={showNavToggle}
      onNavToggle={onNavToggle}
      logoProps={{
        href: history.createHref({ pathname: "/" }),
        onClick: (e: React.SyntheticEvent) => {
          e.preventDefault();
          dispatch(push("/"));
        },
      }}
    />
  );
};

export const PageHeader = withRouter(PageHeaderComponent);
