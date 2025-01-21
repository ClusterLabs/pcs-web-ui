import type React from "react";

export const PrimitiveAttrsFormItemRadio = ({
  id,
  name,
  ariaLabel,
  children,
  onSelect,
  active = true,
}: React.PropsWithChildren<{
  id: string;
  name: string;
  ariaLabel: string;
  onSelect: () => void;
  active?: boolean;
}>) => {
  return (
    <div className={active ? "pf-v5-c-radio ha-c-radio" : ""}>
      {active && (
        <input
          className="pf-v5-c-radio__input"
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
