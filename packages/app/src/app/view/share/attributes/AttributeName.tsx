import React from "react";

export const AttributeName = ({
  name,
  children,
}: React.PropsWithChildren<{name: string}>) => {
  if (!children) {
    return <dt>{name}</dt>;
  }
  return (
    <dt>
      {`${name} `}
      {children}
    </dt>
  );
};
