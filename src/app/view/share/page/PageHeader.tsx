import React from "react";
import { PageHeader as PfPageHeader } from "@patternfly/react-core";

import { useLocation } from "app/view/share/router";
import * as location from "app/view/share/location";

export const PageHeader = ({
  headerTools,
}: {
  headerTools: React.ReactNode;
}) => {
  const { navigate } = useLocation();
  return (
    <PfPageHeader
      logo="HA Cluster Management"
      headerTools={headerTools}
      logoProps={{
        onClick: (e: React.SyntheticEvent) => {
          e.preventDefault();
          navigate(location.dashboard);
        },
      }}
    />
  );
};
