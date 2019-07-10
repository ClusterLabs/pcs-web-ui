import React from "react";

import StatusIco from "./StatusIco";

const StatusSign = ({ status, label, showOkIco = false }) => (
  <React.Fragment>
    {(showOkIco || status !== StatusIco.STATUS_MAP.OK) && (
      <React.Fragment>
        <StatusIco status={status} />
        {" "}
      </React.Fragment>
    )}
    {label}
  </React.Fragment>
);

export default StatusSign;
