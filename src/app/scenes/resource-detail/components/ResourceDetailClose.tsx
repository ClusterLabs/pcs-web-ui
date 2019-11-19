import React from "react";
import { Button } from "@patternfly/react-core";
import { TimesIcon } from "@patternfly/react-icons";

const ResourceDetailClose = ({ onClose }: {
  onClose: (e: React.SyntheticEvent) => void
}) => {
  return (
    <Button variant="plain" aria-label="Close panel" onClick={onClose}>
      <TimesIcon />
    </Button>
  );
};

export default ResourceDetailClose;
