import {assert, mock} from "test/tools";

import {goToFenceDevice, mockWithStonith} from "./common";

const {tabs, arguments: args} = marks.cluster.fenceDevices.currentFenceDevice;

const fenceDeviceId = "F1";

const instanceAttrs = [
  {id: "F1-ia-password", name: "password", value: "lrm://"},
  {id: "F1-ia-ip", name: "ip", value: "192.168.1.1"},
];

describe("Fence device arguments view", () => {
  afterEach(mock.stop);

  it("should render arguments with cib secret", async () => {
    mockWithStonith({
      fenceDeviceIdList: [
        [
          fenceDeviceId,
          {
            instance_attr: instanceAttrs,
          },
        ],
      ],
    });

    await goToFenceDevice(fenceDeviceId);
    await click(tabs.arguments);

    await assert.nvPairIs(args.pair, "ip", "192.168.1.1");
    await isVisible(item.byName(args.pair, "password", p => p.secret));
  });
});
