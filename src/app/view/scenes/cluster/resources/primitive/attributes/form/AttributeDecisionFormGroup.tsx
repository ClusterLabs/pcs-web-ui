import React from "react";

const AttributeDecisionLabel = ({ label, children }: React.PropsWithChildren<{
  label: string;
}>) => {
  return (
    <div className="pf-c-form__group">
      <span className="pf-c-form__label pf-u-pt-md">
        <span className="pf-c-form__label-text">{label}</span>
        <span
          className="pf-c-form__label-required"
          aria-hidden="true"
        >
          &#42;
        </span>
      </span>
      <div
        className="pf-c-form__horizontal-group"
        role="group"
        aria-labelledby={`resource-attribute-value-${label}`}
      >
        {children}
      </div>
    </div>
  );
};

export default AttributeDecisionLabel;
