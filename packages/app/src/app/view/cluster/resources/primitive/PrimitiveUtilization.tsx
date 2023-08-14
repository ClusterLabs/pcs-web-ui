import {
  NVPairListItemMenu,
  UtilizationView,
  useLaunchNVPairCreate,
} from "app/view/cluster/share";
import {Primitive} from "app/view/cluster/types";
import {LaunchersToolbar} from "app/view/share";

export const PrimitiveUtilization = ({primitive}: {primitive: Primitive}) => {
  const owner = {
    type: "resource-utilization",
    id: primitive.id,
  } satisfies Parameters<typeof useLaunchNVPairCreate>[0]["owner"];

  const metaAttributeNameList = primitive.metaAttributes.map(
    nvPair => nvPair.name,
  );
  const launchNVPairCreate = useLaunchNVPairCreate({
    owner,
    createLabel: "Create utilization attribute",
    nameList: metaAttributeNameList,
  });
  return (
    <UtilizationView
      utilizationAttrs={primitive.utilization}
      toolbar={
        <LaunchersToolbar
          toolbarName="primitive-utilization-attributes"
          buttonsItems={[{...launchNVPairCreate}]}
        />
      }
      menu={(nvPairName, nvPairValue) => (
        <NVPairListItemMenu
          owner={owner}
          itemName={nvPairName}
          itemValue={nvPairValue}
          nvPairNameList={metaAttributeNameList}
          launcherEdit={launcherEdit => ({...launcherEdit})}
          launcherRemove={launcherRemove => ({...launcherRemove})}
        />
      )}
    />
  );
};
