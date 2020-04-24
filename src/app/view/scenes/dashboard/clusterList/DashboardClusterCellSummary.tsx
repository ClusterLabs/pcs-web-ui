import React from "react";
import { StatusIco } from "app/view/common";

export const DashboardClusterCellSummary = ({
  itemsCount,
  summaryStatus,
}: {
  itemsCount: number;
  summaryStatus: React.ComponentProps<typeof StatusIco>["status"];
}) => {
  if (summaryStatus === "OK") {
    return <>{itemsCount}</>;
  }
  return (
    <>
      <span className="pf-u-pr-lg">{itemsCount}</span>
      <StatusIco status={summaryStatus} />
    </>
  );
};
