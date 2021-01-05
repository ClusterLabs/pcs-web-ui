import React from "react";

import { types } from "app/store";
import {
  DetailLayoutToolbar,
  DetailLayoutToolbarAction,
  useSelectedClusterName,
} from "app/view";

export const GroupPageToolbar: React.FC<{ group: types.cluster.Group }> = ({
  group,
}) => {
  const cluster = useSelectedClusterName();
  const unclone: DetailLayoutToolbarAction = {
    confirm: {
      title: "Unclone resource?",
      description: (
        <>
          Remove the clone which contains the resource (the resource will not be
          removed).
        </>
      ),
    },
    action: {
      type: "RESOURCE.UNCLONE",
      key: { clusterName: cluster },
      payload: { resourceId: group.id },
    },
  };

  const clone: DetailLayoutToolbarAction = {
    confirm: {
      title: "Clone resource?",
      description: "Set up the specified resource or group as a clone.",
    },
    action: {
      type: "RESOURCE.CLONE",
      key: { clusterName: cluster },
      payload: { resourceId: group.id },
    },
  };
  return (
    <DetailLayoutToolbar
      buttonActions={{
        ...(group.inClone ? { unclone } : { clone }),
      }}
    />
  );
};
