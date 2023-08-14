import {LaunchersToolbar} from "app/view/share";
import {
  NVPairListItemMenu,
  NVPairListPage,
  useLaunchNVPairCreate,
} from "app/view/cluster/share";
import {Primitive} from "app/view/cluster/types";

export const PrimitiveMeta = ({primitive}: {primitive: Primitive}) => {
  const owner = {
    type: "resource-meta",
    id: primitive.id,
  } satisfies Parameters<typeof useLaunchNVPairCreate>[0]["owner"];

  const metaAttributeNameList = primitive.metaAttributes.map(
    nvPair => nvPair.name,
  );

  const launchNVPairCreate = useLaunchNVPairCreate({
    owner,
    createLabel: "Create meta attribute",
    nameList: metaAttributeNameList,
  });
  return (
    <NVPairListPage
      nvPairList={primitive.metaAttributes}
      toolbar={
        <LaunchersToolbar
          toolbarName="primitive-meta-attributes"
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
