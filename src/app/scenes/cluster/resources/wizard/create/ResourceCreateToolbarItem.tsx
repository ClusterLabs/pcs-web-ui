import React from "react";
import { Button } from "@patternfly/react-core";

import { ResourceCreateContextProvider } from "./ResourceCreateContext";
import { ResourceCreate } from "./ResourceCreate";

export const ResourceCreateToolbarItem = ({
  open,
  close,
  isOpened,
}: {
  open: () => void;
  close: () => void;
  isOpened: boolean;
}) => {
  return (
    <>
      <Button variant="primary" onClick={open} data-test="resource-create">
        Create Resource
      </Button>
      {isOpened && (
        <ResourceCreateContextProvider>
          <ResourceCreate onClose={close} />
        </ResourceCreateContextProvider>
      )}
    </>
  );
};
