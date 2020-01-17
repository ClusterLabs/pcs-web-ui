import React from "react";

const PrimitiveAttrsFormItemRadio = (
  {
    id, name, ariaLabel, children, onSelect, active = true,
  }: React.PropsWithChildren<{
    id: string;
    name: string;
    ariaLabel: string;
    onSelect: () => void;
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
          onChange={onSelect}
        />
      )}
      {children}
    </div>
  );
};

export default PrimitiveAttrsFormItemRadio;
