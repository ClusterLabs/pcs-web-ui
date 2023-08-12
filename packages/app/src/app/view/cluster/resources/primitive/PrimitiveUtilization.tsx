import {UtilizationView, useLaunchNVPairCreate} from "app/view/cluster/share";
import {Primitive} from "app/view/cluster/types";
import {LaunchersToolbar} from "app/view/share";

export const PrimitiveUtilization = ({primitive}: {primitive: Primitive}) => {
  const owner = {
    type: "resource-utilization",
    id: primitive.id,
  } satisfies Parameters<typeof useLaunchNVPairCreate>[0]["owner"];

  const launchNVPairCreate = useLaunchNVPairCreate({
    owner,
    createLabel: "Create utilization attribute",
    nameList: primitive.metaAttributes.map(nvPair => nvPair.name),
  });
  return (
    <UtilizationView
      utilizationAttrs={primitive.utilization}
      owner={owner}
      toolbar={
        <LaunchersToolbar
          toolbarName="primitive-utilization-attributes"
          buttonsItems={[{...launchNVPairCreate}]}
        />
      }
    />
  );
};
