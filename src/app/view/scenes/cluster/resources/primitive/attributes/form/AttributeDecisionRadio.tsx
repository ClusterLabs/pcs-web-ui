import React from "react";

const AttributeDecisionRadio = (
  {
    id, name, ariaLabel, value, children,
  }: React.PropsWithChildren<{
    id: string;
    name: string;
    ariaLabel: string;
    value: string;
}>,
) => {
  return (
    <div className="pf-c-radio ha-c-radio">
      <input
        className="pf-c-radio__input"
        type="radio"
        id={id}
        name={name}
        required
        aria-label={ariaLabel}
      />
      {children}
    </div>
  );
};

export default AttributeDecisionRadio;
