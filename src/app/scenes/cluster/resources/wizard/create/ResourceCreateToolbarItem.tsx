import React from "react";
import { Button } from "@patternfly/react-core";

import { useDispatch } from "app/store";
import { useSelectedClusterName } from "app/view";

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
  const dispatch = useDispatch();
  const clusterUrlName = useSelectedClusterName();
  return (
    <>
      <Button variant="primary" onClick={open} data-test="resource-create">
        Create Resource
      </Button>
      {isOpened && (
        <ResourceCreate
          onClose={() => {
            close();
            dispatch({
              type: "RESOURCE.PRIMITIVE.CREATE.CLOSE",
              payload: {
                clusterUrlName,
              },
            });
          }}
        />
      )}
    </>
  );
};
