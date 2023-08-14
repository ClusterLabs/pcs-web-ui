import * as React from "react";
import {Alert, TextContent} from "@patternfly/react-core";

import {NVPairListPage} from "app/view/cluster/share/nvpair";

type PageProps = React.ComponentProps<typeof NVPairListPage>;

export const UtilizationView = ({
  owner,
  nvPairList,
  toolbar,
  listItem,
}: {
  owner: PageProps["owner"];
  nvPairList: PageProps["nvPairList"];
  toolbar: React.ReactNode;
  listItem: PageProps["listItem"];
}) => {
  return (
    <NVPairListPage
      nvPairList={nvPairList}
      owner={owner}
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
      listItem={listItem}
    />
  );
};
