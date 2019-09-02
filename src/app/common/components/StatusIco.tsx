import React from "react";
import {
  ExclamationCircleIcon,
  QuestionCircleIcon,
  ExclamationTriangleIcon,
  CheckIcon,
} from "@patternfly/react-icons";

import { StatusSeverity } from "app/common/types";

import * as pallete from "./pallete";


const StatusIco = ({ status }: { status: StatusSeverity }) => {
  switch (status) {
    case "OK": return <CheckIcon color={pallete.SUCCESS} />;
    case "ERROR": return <ExclamationCircleIcon color={pallete.ERROR} />;
    case "WARNING": return (
      <ExclamationTriangleIcon color={pallete.WARNING_LIGHT} />
    );
    default: return <QuestionCircleIcon color={pallete.UNKNOWN} />;
  }
};

export default StatusIco;
