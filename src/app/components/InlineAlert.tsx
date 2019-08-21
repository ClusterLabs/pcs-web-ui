import React from "react";

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InfoCircleIcon,
} from "@patternfly/react-icons";

enum Variant {
  success = "success",
  danger = "danger",
  warning = "warning",
  info = "info",
}

const variantIcons = {
  [Variant.success]: CheckCircleIcon,
  [Variant.danger]: ExclamationCircleIcon,
  [Variant.warning]: ExclamationTriangleIcon,
  [Variant.info]: InfoCircleIcon,
};

const InlineAlert = ({ variant, title, ...rest }: {
  variant: Variant,
  title: string,
}) => {
  const Icon = variantIcons[variant];
  return (
    <div
      className={`pf-c-alert pf-m-inline pf-m-${variant}`}
      aria-label={`${variant} alert`}
      {...rest}
    >
      <div className="pf-c-alert__icon">
        <Icon />
      </div>
      <h4 className="pf-c-alert__title">
        <span className="pf-screen-reader">{`${variant} alert: `}</span>
        <span aria-label="alert title">{title}</span>
      </h4>
    </div>
  );
};

InlineAlert.Variant = Variant;

export default InlineAlert;
