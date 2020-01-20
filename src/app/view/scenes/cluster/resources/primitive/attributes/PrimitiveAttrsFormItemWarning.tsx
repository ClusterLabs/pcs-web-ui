import React from "react";
import { Alert } from "@patternfly/react-core";

const PrimitiveAttrsFormItemWarning = ({ remoteValue }: {
  remoteValue: string;
}) => {
  return (
    <Alert
      variant="warning"
      isInline
      title={
        remoteValue.length > 0
          ? "Another user provided a new value for this field."
          : "Another user removed value from this field."
      }
    />
  );
};

export default PrimitiveAttrsFormItemWarning;
