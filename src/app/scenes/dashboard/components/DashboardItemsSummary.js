import React from "react";

import { StatusIco } from "app/components";

const { STATUS_MAP } = StatusIco;

const DashboardItemsSummary = ({ items, itemsToStatus }) => {
  const status = itemsToStatus(items);
  if (status === STATUS_MAP.OK) {
    return <React.Fragment>{items.length}</React.Fragment>;
  }
  return (
    <React.Fragment>
      <div>{items.length}</div>
      <div><StatusIco status={status} /></div>
    </React.Fragment>
  );
};

export default DashboardItemsSummary;
