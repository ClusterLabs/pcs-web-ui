import {LaunchersToolbar} from "app/view/share";
import {NVPairListPage, useLaunchNVPairCreate} from "app/view/cluster/share";
import {Primitive} from "app/view/cluster/types";

export const PrimitiveMeta = ({primitive}: {primitive: Primitive}) => {
  const owner = {
    type: "resource-meta",
    id: primitive.id,
  } satisfies Parameters<typeof useLaunchNVPairCreate>[0]["owner"];

  const launchNVPairCreate = useLaunchNVPairCreate({
    owner,
    createLabel: "Create meta attribute",
    nameList: primitive.metaAttributes.map(nvPair => nvPair.name),
  });
  return (
    <NVPairListPage
      nvPairList={primitive.metaAttributes}
      owner={owner}
      toolbar={
        <LaunchersToolbar
          toolbarName="primitive-meta-attributes"
          buttonsItems={[{...launchNVPairCreate}]}
        />
      }
    />
  );
};
