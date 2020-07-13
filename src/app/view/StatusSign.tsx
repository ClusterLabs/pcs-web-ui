import React from "react";

import { StatusIco } from "./StatusIco";

export const StatusSign = ({
  status,
  label = "",
  showOkIco = false,
}: React.ComponentProps<typeof StatusIco> & {
  label?: string | JSX.Element;
  showOkIco?: boolean;
}) => (
  <div>
    {(showOkIco || status !== "OK") && (
      <>
        <StatusIco status={status} />
        {" "}
      </>
    )}
    {label !== "" && <span>{label}</span>}
  </div>
);
