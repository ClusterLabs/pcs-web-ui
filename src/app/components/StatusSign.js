import React from "react";
import {
  CheckIcon,
  QuestionIcon,
  BanIcon,
  ErrorCircleOIcon,
  TimesIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  QuestionCircleIcon,
  ExclamationTriangleIcon,
  WarningTriangleIcon,
} from "@patternfly/react-icons";
import { StyleSheet, css } from "@patternfly/react-styles";

import * as pallete from "app/components/pallete";

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
  <Base icon={CheckIcon} label={label} color={pallete.SUCCESS} />
);

export const Error = ({ label = "" }) => (
  <Base icon={TimesIcon} label={label} color={pallete.ERROR} />
);

export const Warning = ({ label = "" }) => (
  <Base icon={WarningTriangleIcon} label={label} color={pallete.WARNING} />
);

export const SuccessAggregation = ({ label = "" }) => (
  <Base icon={CheckCircleIcon} label={label} color={pallete.SUCCESS} />
);

export const WarningAggregation = ({ label = "" }) => (
  <Base icon={ExclamationTriangleIcon} label={label} color={pallete.WARNING} />
);

export const ErrorAggregation = ({ label = "" }) => (
  <Base icon={ExclamationCircleIcon} label={label} color={pallete.ERROR} />
);

export const UnknownAggregation = ({ label = "" }) => (
  <Base icon={QuestionCircleIcon} label={label} color={pallete.UNKNOWN} />
);

export const Online = () => <Success label="online" />;

export const Offline = () => <Error label="offline" />;

export const Running = () => <Success label="running" />;

export const Unknown = () => (
  <Base icon={QuestionIcon} label="unknown" color={pallete.UNKNOWN} />
);

export const Blocked = () => (
  <Base icon={BanIcon} label="blocked" color={pallete.ERROR} />
);

export const Failed = () => (
  <Base icon={ErrorCircleOIcon} label="failed" color={pallete.ERROR} />
);
