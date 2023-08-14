import {LaunchersToolbar} from "app/view/share";

import {useLaunchNVPairCreate} from "./useLaunchNVPairCreate";
import {useNVPairListContext} from "./NVPairListContext";

type LauncherItem = NonNullable<
  React.ComponentProps<typeof LaunchersToolbar>["buttonsItems"]
>[number];

export const NVPairToolbar = ({
  createLabel,
  launcherCreate,
}: {
  createLabel: string;
  launcherCreate: (createData: LauncherItem) => LauncherItem;
}) => {
  const {owner, nvPairList} = useNVPairListContext();
  const launchNVPairCreate = useLaunchNVPairCreate({
    owner,
    createLabel,
    nameList: nvPairList.map(pair => pair.name),
  });
  return (
    <LaunchersToolbar
      toolbarName={owner.type}
      buttonsItems={[{...launcherCreate(launchNVPairCreate)}]}
    />
  );
};
