import type React from "react";

import {StatusIco} from "app/view/share";

export const DashboardClusterCellSummary = ({
  itemsCount,
  summaryStatus,
}: {
  itemsCount: number | "?";
  summaryStatus: React.ComponentProps<typeof StatusIco>["status"];
}) => {
  if (summaryStatus === "OK") {
    return <>{itemsCount}</>;
  }
  return (
    <>
      <span className="pf-v5-u-pr-lg">{itemsCount}</span>
      <StatusIco status={summaryStatus} />
    </>
  );
};
