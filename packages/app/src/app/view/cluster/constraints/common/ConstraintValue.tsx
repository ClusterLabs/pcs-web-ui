import type React from "react";

export const ConstraintValue = ({
  label,
  value,
  children,
  block = true,
}: React.PropsWithChildren<{
  label: string;
  value?: string | number | boolean | undefined | null;
  block?: boolean;
}>) => {
  const Component = block ? "div" : "span";
  return (
    <Component>
      {`${label} `}
      <strong>
        {children && children}
        {!children && value}
      </strong>
    </Component>
  );
};
