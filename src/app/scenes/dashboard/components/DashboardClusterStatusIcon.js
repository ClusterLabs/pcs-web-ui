import React from "react";

import { STATUS } from "app/services/cluster/status-constants";
import { StatusSign } from "app/components";

const DashboardClusterStatusIcon = ({ status, ...rest }) => {
  switch (status) {
    case STATUS.OK: return (
      <StatusSign.SuccessAggregation
        data-role="status"
        data-role-key="ok"
        {...rest}
      />
    );
    case STATUS.ERROR: return (
      <StatusSign.ErrorAggregation
        data-role="status"
        data-role-key="error"
        {...rest}
      />
    );
    case STATUS.WARNING: return (
      <StatusSign.WarningAggregation
        data-role="status"
        data-role-key="warning"
        {...rest}
      />
    );
    default: return (
      <StatusSign.UnknownAggregation
        data-role="status"
        data-role-key="unknown"
        {...rest}
      />
    );
  }
};

export default DashboardClusterStatusIcon;
