import React from "react";
import { Button } from "@patternfly/react-core";

export const NodeAddToolbarItem: React.FC = () => {
  return (
    <>
      <Button variant="primary" onClick={() => {}} data-test="resource-create">
        Add node
      </Button>
    </>
  );
};
