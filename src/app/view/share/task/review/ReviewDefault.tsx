import React from "react";

export const ReviewDefault: React.FC<{ value: React.ReactNode }> = ({
  value,
}) => {
  return <div style={{ fontStyle: "italic" }}>{value}</div>;
};
