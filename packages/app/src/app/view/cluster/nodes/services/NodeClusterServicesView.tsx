import React from "react";
import {Gallery, GalleryItem} from "@patternfly/react-core";

import type {Node} from "app/view/cluster/types";

import {NodeServiceCard} from "./NodeServiceCard";
import {NodeServiceFlag} from "./NodeServiceFlag";

export const NodeClusterServicesView = ({node}: {node: Node}) => {
  return (
    <Gallery hasGutter>
      <GalleryItem>
        <NodeServiceCard label="Pacemaker">
          <NodeServiceFlag
            ok={!node.inStandby}
            okLabel="Not Standby"
            warningLabel="Standby"
          />
          <NodeServiceFlag
            ok={!node.inMaintenance}
            okLabel="Not Maintenance"
            warningLabel="Maintenance"
          />
        </NodeServiceCard>
      </GalleryItem>
    </Gallery>
  );
};
