import type React from "react";
import {LauncherDropdown} from "app/view/share";
import {useOpenTask} from "app/view/task";

import {useNVPairListContext} from "./NVPairListContext";
import {useNVPairListItemContext} from "./NVPairListItemContext";

type Launcher = React.ComponentProps<typeof LauncherDropdown>["items"][number];

export const NVPairListItemMenu = (props: {
  launcherEdit: (editData: Launcher) => Launcher;
  launcherRemove: (removeData: Launcher) => Launcher;
  "data-test"?: string;
}) => {
  const openTask = useOpenTask();
  const {nvPairList, owner} = useNVPairListContext();
  const nvPair = useNVPairListItemContext();
  return (
    <LauncherDropdown
      items={[
        props.launcherEdit({
          name: "edit",
          run: () =>
            openTask("nvpairEdit", {
              type: "CLUSTER.NVPAIRS.EDIT",
              key: {task: "nvpairEdit"},
              payload: {
                type: "update",
                owner,
                name: nvPair.name,
                value: nvPair.value,
                nameList: nvPairList.map(pair => pair.name),
              },
            }),
        }),
        props.launcherRemove({
          name: "remove",
          confirm: {
            title: `Remove the attribute "${nvPair.name}"?`,
            description: "Removes the attribute.",
            action: {
              type: "CLUSTER.NVPAIRS.SAVE",
              key: {task: "nvpairEdit"},
              payload: {
                owner,
                name: nvPair.name,
                value: "",
              },
            },
          },
        }),
      ]}
      data-test={props["data-test"]}
    />
  );
};
