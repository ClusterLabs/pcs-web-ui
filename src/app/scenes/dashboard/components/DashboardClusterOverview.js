import React from "react";
import { Link } from "react-router-dom";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  UnknownIcon,
  ExclamationTriangleIcon,
} from "@patternfly/react-icons";


const DashboardClusterOverview = ({ cluster }) => (
  <Link
    id={`dashboard-cluster-${cluster.name}`}
    data-role="detail-link"
    to={`/cluster/${cluster.name}`}
  >
    {cluster.name}
  </Link>
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
      <ExclamationCircleIcon
        color="#c00"
        data-role="status"
        data-role-key="error"
      />
    );
    case "warning": return (
      <ExclamationTriangleIcon
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
