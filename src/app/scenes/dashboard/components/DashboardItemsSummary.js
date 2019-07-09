import React from "react";
import {
  ExclamationCircleIcon,
  QuestionCircleIcon,
  ExclamationTriangleIcon,
} from "@patternfly/react-icons";
import * as pallete from "app/components/pallete";

const StatusIco = ({ status }) => {
  switch (status) {
    case "ok": return null;
    case "error":
      return <div><ExclamationCircleIcon color={pallete.ERROR} /></div>;
    case "warning": return (
      <div>
        <ExclamationTriangleIcon color={pallete.WARNING_LIGHT} />
      </div>
    );
    default:
      return <div><QuestionCircleIcon color={pallete.UNKNOWN} /></div>;
  }
};

const DashboardItemsSummary = ({ items, itemsToStatus }) => {
  const status = itemsToStatus(items);
  if (status === "ok") {
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
