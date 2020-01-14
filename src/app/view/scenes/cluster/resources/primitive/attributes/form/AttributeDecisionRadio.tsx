import React from "react";

const AttributeDecisionRadio = (
  {
    id, name, ariaLabel, children, active = true,
  }: React.PropsWithChildren<{
    id: string;
    name: string;
    ariaLabel: string;
    active?: boolean;
}>,
) => {
  return (
    <div className={active ? "pf-c-radio ha-c-radio" : ""}>
      {active && (
        <input
          className="pf-c-radio__input"
          type="radio"
          id={id}
          name={name}
          required
          aria-label={ariaLabel}
        />
      )}
      {children}
    </div>
  );
};

export default AttributeDecisionRadio;
