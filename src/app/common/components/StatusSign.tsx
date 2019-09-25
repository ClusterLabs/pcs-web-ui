import React from "react";

import StatusIco from "./StatusIco";

const StatusSign = (
  { status, label, showOkIco = false }:
  React.ComponentProps<typeof StatusIco> & {
    label: string,
    showOkIco?: boolean,
  },
) => (
  <>
    {(showOkIco || status !== "OK") && (
      <>
        <StatusIco status={status} />
        {" "}
      </>
    )}
    <span>{label}</span>
  </>
);

export default StatusSign;
