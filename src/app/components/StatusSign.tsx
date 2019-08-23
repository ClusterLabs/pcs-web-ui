import React from "react";

import StatusIco from "./StatusIco";

const StatusSign = ({ status, label, showOkIco = false }: {
  status: any,
  label: string,
  showOkIco?: boolean,
}) => (
  <>
    {(showOkIco || status !== StatusIco.STATUS_MAP.OK) && (
      <>
        <StatusIco status={status} />
        {" "}
      </>
    )}
    {label}
  </>
);

export default StatusSign;
