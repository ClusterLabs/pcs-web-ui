import React from "react";
import {
  global_danger_color_200 as dangerColor,
  global_warning_color_200 as warningColor,
  global_success_color_200 as successColor,
} from "@patternfly/react-tokens";
import {
  CheckIcon,
  QuestionIcon,
  BanIcon,
  TimesIcon,
} from "@patternfly/react-icons";

import { LabelWithIcon } from "app/components";

const color = {
  success: successColor.var,
  error: dangerColor.var,
  unknown: warningColor.var,
  warning: warningColor.var,
};

export const Success = ({ label = "" }) => (
  <LabelWithIcon icon={CheckIcon} label={label} color={color.success} />
);

export const Error = ({ label = "" }) => (
  <LabelWithIcon icon={TimesIcon} label={label} color={color.error} />
);

export const Online = () => <Success label="online" />;

export const Offline = () => <Error label="offline" />;

export const Running = () => <Success label="running" />;


export const Unknown = () => (
  <LabelWithIcon icon={QuestionIcon} label="unknown" color={color.unknown} />
);

export const Blocked = () => (
  <LabelWithIcon icon={BanIcon} label="blocked" color={color.error} />
);
