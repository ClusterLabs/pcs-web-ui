import React from "react";

import { StatusIco } from "./StatusIco";

export const StatusSign: React.FC<
  React.ComponentProps<typeof StatusIco> & {
    label?: string | React.ReactNode;
    showOkIco?: boolean;
  }
> = ({ status, label = "", showOkIco = false }) => (
  <div>
    {(showOkIco || status !== "OK") && (
      <>
        <StatusIco status={status} />{" "}
      </>
    )}
    {label !== "" && <span>{label}</span>}
  </div>
);
