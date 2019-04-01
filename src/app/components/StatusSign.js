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

export const Base = ({
  icon: Icon,
  color,
  label = "",
  ...rest
}) => (
  <span style={{ color }} {...rest}>
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

export const Success = ({ label = "", ...rest }) => (
  <Base
    icon={CheckIcon}
    label={label}
    color={pallete.SUCCESS}
    {...rest}
  />
);

export const Error = ({ label = "", ...rest }) => (
  <Base
    icon={TimesIcon}
    label={label}
    color={pallete.ERROR}
    {...rest}
  />
);

export const Warning = ({ label = "", ...rest }) => (
  <Base
    icon={WarningTriangleIcon}
    label={label}
    color={pallete.WARNING}
    {...rest}
  />
);

export const SuccessAggregation = ({ label = "", ...rest }) => (
  <Base
    icon={CheckCircleIcon}
    label={label}
    color={pallete.SUCCESS}
    {...rest}
  />
);

export const WarningAggregation = ({ label = "", ...rest }) => (
  <Base
    icon={ExclamationTriangleIcon}
    label={label}
    color={pallete.WARNING}
    {...rest}
  />
);

export const ErrorAggregation = ({ label = "", ...rest }) => (
  <Base
    icon={ExclamationCircleIcon}
    label={label}
    color={pallete.ERROR}
    {...rest}
  />
);

export const UnknownAggregation = ({ label = "", ...rest }) => (
  <Base
    icon={QuestionCircleIcon}
    label={label}
    color={pallete.UNKNOWN}
    {...rest}
  />
);

export const Online = ({ ...rest }) => <Success label="online" {...rest} />;

export const Offline = ({ ...rest }) => <Error label="offline" {...rest} />;

export const Running = ({ ...rest }) => <Success label="running" {...rest} />;

export const Unknown = ({ ...rest }) => (
  <Base
    icon={QuestionIcon}
    label="unknown"
    color={pallete.UNKNOWN}
    {...rest}
  />
);

export const Blocked = ({ ...rest }) => (
  <Base
    icon={BanIcon}
    label="blocked"
    color={pallete.ERROR}
    {...rest}
  />
);

export const Failed = ({ ...rest }) => (
  <Base
    icon={ErrorCircleOIcon}
    label="failed"
    color={pallete.ERROR}
    {...rest}
  />
);
