import React from "react";
import { Gallery, GalleryItem } from "@patternfly/react-core";

import { types } from "app/store";
import { useClusterState, useSelectedClusterName } from "app/view";

import { NodeServiceCard } from "./NodeServiceCard";
import { NodeServiceFlag } from "./NodeServiceFlag";

export const NodeClusterServicesView = ({
  node,
}: {
  node: types.cluster.ConnectedNode;
}) => {
  const { isNodeAttrCibTrue } = useClusterState(useSelectedClusterName());
  return (
    <Gallery hasGutter>
      <GalleryItem>
        <NodeServiceCard label="Pacemaker">
          <NodeServiceFlag
            ok={!isNodeAttrCibTrue(node.name, "standby")}
            okLabel="Not Standby"
            warningLabel="Standby"
          />
          <NodeServiceFlag
            ok={!isNodeAttrCibTrue(node.name, "maintenance")}
            okLabel="Not Maintenance"
            warningLabel="Maintenance"
          />
        </NodeServiceCard>
      </GalleryItem>
    </Gallery>
  );
};
