import {assert, mock} from "test/tools";

import {goToFenceDevice, mockWithStonith} from "./common";

const {
  tabs,
  arguments: args,
  argumentsToolbar,
} = marks.cluster.fenceDevices.currentFenceDevice;

const fenceDeviceId = "F1";

const secretAttr = "password";
const revealedValue = "f3nc3-s3cret";
const instanceAttrs = [
  {id: "F1-ia-password", name: secretAttr, value: "lrm://"},
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
    await isVisible(item.byName(args.pair, secretAttr, p => p.secret));
  });

  it("should reveal cib secret when toggle is activated", async () => {
    mockWithStonith({
      fenceDeviceIdList: [
        [
          fenceDeviceId,
          {
            instance_attr: instanceAttrs,
          },
        ],
      ],
      additionalRouteList: [
        mock.route.resourceGetCibsecrets({
          clusterName: "test-cluster",
          queries: [["F1", secretAttr]],
          resultData: {
            resource_secrets: [
              {resource_id: "F1", name: secretAttr, value: revealedValue},
            ],
          },
        }),
      ],
    });

    await goToFenceDevice(fenceDeviceId);
    await click(tabs.arguments);

    await isVisible(item.byName(args.pair, secretAttr, p => p.secret));

    await click(argumentsToolbar.secretsToggle);

    await isVisible(item.byName(args.pair, secretAttr, p => p.secretRevealed));
    await assert.textIs(
      item.byName(args.pair, secretAttr, p => p.secretRevealed),
      revealedValue,
    );
  });
});
