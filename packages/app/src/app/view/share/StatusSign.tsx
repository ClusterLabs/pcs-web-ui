import React from "react";

import {StatusIco} from "./StatusIco";

export const StatusSign = ({
  status,
  label = "",
  showOkIco = false,
}: {
  status: React.ComponentProps<typeof StatusIco>["status"];
  label?: React.ReactNode;
  showOkIco?: boolean;
}) => (
  <div>
    {(showOkIco || status !== "OK") && (
      <>
        <StatusIco status={status} />{" "}
      </>
    )}
    {label !== "" && <span>{label}</span>}
  </div>
);
