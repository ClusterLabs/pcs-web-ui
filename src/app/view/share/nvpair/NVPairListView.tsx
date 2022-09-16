import * as React from "react";
import { StackItem } from "@patternfly/react-core";

import { ActionPayload } from "app/store";
import { NVPair } from "app/view/cluster/types";
import { EmptyStateNoItem } from "app/view/share/emptyState";
import { LaunchersToolbar } from "app/view/share/toolbar";

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
  beforeList?: React.ReactNode;
}) => {
  return (
    <>
      <StackItem>
        <LaunchersToolbar
          toolbarName="nvpairs"
          buttonsItems={[
            {
              name: "create",
              label: createLabel,
              task: {
                component: task.edit.Task,
                useTask: task.edit.useTask,
                openArgs: [
                  {
                    type: "create",
                    owner,
                    nameList: nvPairList.map(nvPair => nvPair.name),
                  },
                ],
              },
            },
          ]}
        />
      </StackItem>

      {beforeList && <StackItem>{beforeList}</StackItem>}

      <StackItem>
        {nvPairList.length === 0 && (
          <EmptyStateNoItem
            title="No attribute here."
            message="No attribute has been added."
          />
        )}
        {nvPairList.length !== 0 && (
          <NVPairList nvPairList={nvPairList} owner={owner} />
        )}
      </StackItem>
    </>
  );
};
