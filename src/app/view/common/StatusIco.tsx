import React from "react";
import {
  ExclamationCircleIcon,
  QuestionCircleIcon,
  ExclamationTriangleIcon,
  OkIcon,
} from "@patternfly/react-icons";

import { types } from "app/store";

import * as pallete from "./pallete";


export const StatusIco = ({ status }: {
  status: types.cluster.StatusSeverity
}) => {
  switch (status) {
    case "OK": return <OkIcon />;
    case "ERROR": return <ExclamationCircleIcon color={pallete.ERROR} />;
    case "WARNING": return (
      <ExclamationTriangleIcon color={pallete.WARNING_LIGHT} />
    );
    default: return <QuestionCircleIcon color={pallete.UNKNOWN} />;
  }
};
