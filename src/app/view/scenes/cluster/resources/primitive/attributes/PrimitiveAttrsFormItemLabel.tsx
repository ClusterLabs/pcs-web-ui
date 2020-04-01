import React from "react";

export const PrimitiveAttrsFormItemLabel = ({ htmlFor, remoteValue }: {
  htmlFor: string;
  remoteValue: string;
}) => {
  return (
    <>
      <label className="pf-c-radio__label" htmlFor={htmlFor}>
        {remoteValue.length > 0
          ? "Use the new value"
          : "Keep the value removed"}
      </label>
      {remoteValue.length > 0 && (
      <>
        <br />
        <strong>{remoteValue}</strong>
      </>
      )}
    </>
  );
};
