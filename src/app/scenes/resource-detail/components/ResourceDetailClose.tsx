import React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { Button } from "@patternfly/react-core";
import { TimesIcon } from "@patternfly/react-icons";

const ResourceDetailClose = (
  { closeUrl }: { closeUrl: string },
) => {
  const dispatch = useDispatch();
  return (
    <Button
      variant="plain"
      aria-label="Close panel"
      onClick={(e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(push(closeUrl));
      }}
    >
      <TimesIcon />
    </Button>
  );
};

export default ResourceDetailClose;
