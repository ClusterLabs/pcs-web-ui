import React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { Button } from "@patternfly/react-core";
import { TimesIcon } from "@patternfly/react-icons";

import * as url from "app/common/urls";

const ResourceDetailViewClose = (
  { clusterUrlName }: { clusterUrlName: string },
) => {
  const dispatch = useDispatch();
  return (
    <Button
      variant="plain"
      aria-label="Close panel"
      onClick={(e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(push(url.clusterResources(clusterUrlName)));
      }}
    >
      <TimesIcon />
    </Button>
  );
};

export default ResourceDetailViewClose;
