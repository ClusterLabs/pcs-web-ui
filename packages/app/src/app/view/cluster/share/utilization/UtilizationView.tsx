import * as React from "react";
import {Alert, TextContent} from "@patternfly/react-core";

import {NVPairListPage} from "app/view/cluster/share/nvpair";

type PageProps = React.ComponentProps<typeof NVPairListPage>;

export const UtilizationView = (props: {
  owner: PageProps["owner"];
  nvPairList: PageProps["nvPairList"];
  toolbar: React.ReactNode;
  listItem: PageProps["listItem"];
  "data-test": string;
}) => {
  return (
    <NVPairListPage
      nvPairList={props.nvPairList}
      owner={props.owner}
      toolbar={props.toolbar}
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
      listItem={props.listItem}
      data-test={props["data-test"]}
    />
  );
};
