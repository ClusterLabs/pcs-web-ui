import React from "react";
import { Link } from "react-router-dom";
import {
  CheckCircleIcon,
  ErrorCircleOIcon,
  UnknownIcon,
  WarningTriangleIcon,
} from "@patternfly/react-icons";

import DashboardClusterWarning from "./DashboardClusterWarning";

const DashboardClusterOverview = ({ cluster }) => (
  <React.Fragment>
    <Link data-role="detail-link" to={`/cluster/${cluster.name}`}>
      {cluster.name}
    </Link>
    <DashboardClusterWarning
      warningList={cluster.warningList.map(warning => warning)}
    />
  </React.Fragment>
);

DashboardClusterOverview.Icon = ({ status }) => {
  switch (status) {
    case "ok": return (
      <CheckCircleIcon
        color="green"
        data-role="status"
        data-role-key="ok"
      />
    );
    case "error": return (
      <ErrorCircleOIcon
        color="#c00"
        data-role="status"
        data-role-key="error"
      />
    );
    case "warning": return (
      <WarningTriangleIcon
        color="#795600"
        data-role="status"
        data-role-key="warning"
      />
    );
    default: return (
      <UnknownIcon
        color="gray"
        data-role="status"
        data-role-key="unknown"
      />
    );
  }
};

export default DashboardClusterOverview;
