import * as React from "react";
import {
  ActionList,
  StackItem,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";

import { ActionPayload } from "app/store";
import { NVPair } from "app/view/cluster/types";
import { ActionTaskLauncher } from "app/view/share/task";

import { NVPairList } from "./NVPairList";
import * as task from "./task";

export const NVPairListView = ({
  nvPairList,
  owner,
  createLabel,
  beforeList,
}: {
  nvPairList: NVPair[];
  owner: ActionPayload["CLUSTER.NVPAIRS.EDIT"]["owner"];
  createLabel: string;
  beforeList: React.ReactNode;
}) => {
  return (
    <>
      <StackItem>
        <Toolbar data-test="nvpairs-toolbar">
          <ToolbarGroup>
            <ToolbarItem>
              <ActionList>
                <ActionTaskLauncher
                  taskComponent={task.edit.Task}
                  useTask={task.edit.useTask}
                  openArgs={[{ type: "create", owner }]}
                  label={createLabel}
                />
              </ActionList>
            </ToolbarItem>
          </ToolbarGroup>
        </Toolbar>
      </StackItem>
      {beforeList && <StackItem>{beforeList}</StackItem>}
      <StackItem>
        <NVPairList nvPairList={nvPairList} owner={owner} />
      </StackItem>
    </>
  );
};
