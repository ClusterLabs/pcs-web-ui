import {ActionPayload} from "app/store";
import {LaunchersToolbar} from "app/view/share";

import {useLaunchNVPairCreate} from "./useLaunchNVPairCreate";

type LauncherItem = NonNullable<
  React.ComponentProps<typeof LaunchersToolbar>["buttonsItems"]
>[number];

export const NVPairToolbar = ({
  owner,
  nvPairNameList,
  createLabel,
  launcherCreate,
}: {
  owner: ActionPayload["CLUSTER.NVPAIRS.SAVE"]["owner"];
  nvPairNameList: string[];
  createLabel: string;
  launcherCreate: (createData: LauncherItem) => LauncherItem;
}) => {
  const launchNVPairCreate = useLaunchNVPairCreate({
    owner,
    createLabel,
    nameList: nvPairNameList,
  });
  return (
    <LaunchersToolbar
      toolbarName="nv-pairs"
      buttonsItems={[{...launcherCreate(launchNVPairCreate)}]}
    />
  );
};
