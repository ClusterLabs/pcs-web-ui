import * as React from "react";
import {Alert, TextContent} from "@patternfly/react-core";

import {NVPair} from "app/view/cluster/types";
import {NVPairListPage} from "app/view/cluster/share/nvpair";

export const UtilizationView = ({
  utilizationAttrs,
  toolbar,
  menu,
}: {
  utilizationAttrs: NVPair[];
  toolbar: React.ReactNode;
  menu: React.ComponentProps<typeof NVPairListPage>["menu"];
}) => {
  return (
    <NVPairListPage
      nvPairList={utilizationAttrs}
      toolbar={toolbar}
      beforeList={
        <Alert isInline title="Utilization attributes" variant="info">
          <TextContent>
            To configure the capacity that a node provides or a resource
            requires, you can use utilization attributes in node and resource
            objects. A node is considered eligible for a resource if it has
            sufficient free capacity to satisfy the resource’s requirements
          </TextContent>
        </Alert>
      }
      menu={menu}
    />
  );
};
