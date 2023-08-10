import {testMarks} from "app/view/dataTest";
import {Node} from "app/view/cluster/types";
import {DefaultValue} from "app/view/share";

const {device, deviceNotProvided, deviceNotConfigured} =
  testMarks.cluster.sbd.perNode;

export const SbdOnNodesDevices = ({node}: {node: Node}) => {
  if (node.status === "DATA_NOT_PROVIDED") {
    return (
      <DefaultValue
        value="Node data not provided"
        {...deviceNotProvided.mark}
      />
    );
  }
  const deviceList = node.sbd?.devices ?? [];
  if (deviceList.length === 0) {
    return (
      <DefaultValue
        value="No device configured"
        {...deviceNotConfigured.mark}
      />
    );
  }
  return (
    <>
      {deviceList.map((d, i) => (
        <div key={i} {...device.mark}>
          {d}
        </div>
      ))}
    </>
  );
};
