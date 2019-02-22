import React from "react";
import {
  global_danger_color_200 as dangerColor,
  global_warning_color_200 as warningColor,
  global_success_color_200 as successColor,
  global_disabled_color_100 as unknownColor,
} from "@patternfly/react-tokens";
import {
  CheckIcon,
  QuestionIcon,
  BanIcon,
  TimesIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  QuestionCircleIcon,
  ExclamationTriangleIcon,
} from "@patternfly/react-icons";
import { StyleSheet, css } from "@patternfly/react-styles";

const pallete = {
  success: successColor.var,
  error: dangerColor.var,
  unknown: unknownColor.var,
  warning: warningColor.var,
};

const styles = StyleSheet.create({
  label: {
    "padding-left": "0.3em",
  },
});

export const Base = ({ icon: Icon, color, label = "" }) => (
  <span style={{ color }}>
    <Icon />
    {
      label && (
        <span style={{ color }} className={css(styles.label)}>
          {label}
        </span>
      )
    }
  </span>
);

export const Success = ({ label = "" }) => (
  <Base icon={CheckIcon} label={label} color={pallete.success} />
);

export const Error = ({ label = "" }) => (
  <Base icon={TimesIcon} label={label} color={pallete.error} />
);

export const SuccessAggregation = ({ label = "" }) => (
  <Base icon={CheckCircleIcon} label={label} color={pallete.success} />
);

export const WarningAggregation = ({ label = "" }) => (
  <Base icon={ExclamationTriangleIcon} label={label} color={pallete.warning} />
);

export const ErrorAggregation = ({ label = "" }) => (
  <Base icon={ExclamationCircleIcon} label={label} color={pallete.error} />
);

export const UnknownAggregation = ({ label = "" }) => (
  <Base icon={QuestionCircleIcon} label={label} color={pallete.unknown} />
);

export const Online = () => <Success label="online" />;

export const Offline = () => <Error label="offline" />;

export const Running = () => <Success label="running" />;

export const Unknown = () => (
  <Base icon={QuestionIcon} label="unknown" color={pallete.unknown} />
);

export const Blocked = () => (
  <Base icon={BanIcon} label="blocked" color={pallete.error} />
);
