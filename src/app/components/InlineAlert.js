import React from "react";

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InfoCircleIcon,
} from "@patternfly/react-icons";

const variantIcons = {
  success: CheckCircleIcon,
  danger: ExclamationCircleIcon,
  warning: ExclamationTriangleIcon,
  info: InfoCircleIcon,
};

const InlineAlert = ({ variant, title }) => {
  const Icon = variantIcons[variant];
  const capitalizedVariant = (
    `${variant[0].toUpperCase()}${variant.slice(1).toLowerCase()}`
  );
  return (
    <div
      className={`pf-c-alert pf-m-inline pf-m-${variant}`}
      aria-label={
        `${capitalizedVariant} Alert`
      }
    >
      <div className="pf-c-alert__icon">
        <Icon />
      </div>
      <h4 className="pf-c-alert__title">
        <span className="pf-screen-reader">
          {`${capitalizedVariant} alert:`}
        </span>
        {title}
      </h4>
    </div>
  );
};

export default InlineAlert;
