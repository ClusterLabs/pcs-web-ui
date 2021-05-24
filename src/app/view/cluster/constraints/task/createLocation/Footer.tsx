import React from "react";
import { Button } from "@patternfly/react-core";

import { useTask } from "./useTask";

export const Footer: React.FC = () => {
  const {
    close,
    createLocation,
    state: {
      call: { response },
    },
  } = useTask();
  if (response !== "") {
    return null;
  }
  return (
    <>
      <Button variant="primary" onClick={createLocation}>
        Create location
      </Button>
      <Button variant="link" onClick={close}>
        Cancel
      </Button>
    </>
  );
};
