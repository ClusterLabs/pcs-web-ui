import { Node } from "app/view/cluster/types";
import { DefaultValue } from "app/view/share";

export const SbdOnNodesDevices = ({ node }: { node: Node }) => {
  if (node.status === "DATA_NOT_PROVIDED") {
    return <DefaultValue value="Node data not provided" />;
  }
  const deviceList = node.sbd?.devices ?? [];
  if (deviceList.length === 0) {
    return <DefaultValue value="No device configured" />;
  }
  return (
    <>
      {deviceList.map((d, i) => (
        <div key={i}>{d}</div>
      ))}
    </>
  );
};
