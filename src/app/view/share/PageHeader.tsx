import React from "react";
import {
  PageHeaderTools,
  PageHeader as PfPageHeader,
} from "@patternfly/react-core";

import { location, useLocation } from "app/view/share";

import { PageToolbar } from "./PageToolbar";

export const PageHeader = () => {
  const { navigate } = useLocation();
  return (
    <PfPageHeader
      logo="HA Cluster Management"
      headerTools={
        <PageHeaderTools>
          <PageToolbar />
        </PageHeaderTools>
      }
      logoProps={{
        onClick: (e: React.SyntheticEvent) => {
          e.preventDefault();
          navigate(location.dashboard);
        },
      }}
    />
  );
};
