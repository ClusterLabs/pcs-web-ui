import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import {
  PageHeaderTools,
  PageHeader as PfPageHeader,
} from "@patternfly/react-core";
import { History } from "history";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

import { PageToolbar } from "./PageToolbar";

const PageHeaderComponent: React.FC<
  RouteComponentProps & {
    history: History;
    showNavToggle?: boolean;
    onNavToggle?: () => void;
  }
> = ({ history, showNavToggle, onNavToggle }) => {
  const dispatch = useDispatch();
  return (
    <PfPageHeader
      logo="HA Cluster Management"
      headerTools={
        <PageHeaderTools>
          <PageToolbar />
        </PageHeaderTools>
      }
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
