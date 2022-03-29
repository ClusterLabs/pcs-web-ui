import {
  ActionList,
  Alert,
  StackItem,
  TextContent,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";

import { ActionPayload } from "app/store";
import { NVPair } from "app/view/cluster/types";
import { ActionTaskLauncher } from "app/view/share/task";

import * as task from "./task";
import { UtilizationAttrs } from "./UtilizationAttrs";

export const UtilizationView = ({
  utilizationAttrs,
  owner,
}: {
  utilizationAttrs: NVPair[];
  owner: ActionPayload["CLUSTER.UTILIZATION.EDIT"]["owner"];
}) => {
  return (
    <>
      <StackItem>
        <Toolbar data-test="dashboard-toolbar">
          <ToolbarGroup>
            <ToolbarItem>
              <ActionList>
                <ActionTaskLauncher
                  taskComponent={task.edit.Task}
                  useTask={task.edit.useTask}
                  openArgs={[{ type: "create", owner }]}
                  label="Create Utilization Attribute"
                />
              </ActionList>
            </ToolbarItem>
          </ToolbarGroup>
        </Toolbar>
      </StackItem>
      <StackItem>
        <Alert isInline title="Utilization attributes" variant="info">
          <TextContent>
            To configure the capacity that a node provides or a resource
            requires, you can use utilization attributes in node and resource
            objects. A node is considered eligible for a resource if it has
            sufficient free capacity to satisfy the resource’s requirements
          </TextContent>
        </Alert>
      </StackItem>
      <StackItem>
        <UtilizationAttrs utilizationAttrs={utilizationAttrs} owner={owner} />
      </StackItem>
    </>
  );
};
