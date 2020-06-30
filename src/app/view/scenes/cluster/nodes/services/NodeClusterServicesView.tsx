import React from "react";
import { Gallery, GalleryItem } from "@patternfly/react-core";

import { types } from "app/store";

import { NodeServiceCard } from "./NodeServiceCard";
import { NodeServiceFlag } from "./NodeServiceFlag";

export const NodeClusterServicesView = ({
  node,
}: {
  node: types.cluster.ConnectedNode;
}) => {
  return (
    <Gallery hasGutter>
      <GalleryItem>
        <NodeServiceCard label="Pacemaker">
          <NodeServiceFlag
            ok={!node.clusterServices.pacemaker.standby}
            okLabel="Not Standby"
            warningLabel="Standby"
          />
          <NodeServiceFlag
            ok={!node.clusterServices.pacemaker.maintenance}
            okLabel="Not Maintenance"
            warningLabel="Maintenance"
          />
        </NodeServiceCard>
      </GalleryItem>
    </Gallery>
  );
};
