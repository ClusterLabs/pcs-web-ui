import {mock} from "test/tools";
import {clusterName, goToFenceDevice, mockWithStonith} from "./common";
import * as responses from "dev/responses";

const fenceDeviceId = "F1";
const confirmTitle = "Enable fence device?";

const launchTask = async (id: string) => {
  await goToFenceDevice(id);
  await click(marks.cluster.fenceDevices.currentFenceDevice.toolbar.enable);
};

const mockForEnable = (response?: mock.RouteResponse) =>
  mockWithStonith({
    fenceDeviceIdList: [
      [
        fenceDeviceId,
        {
          meta_attr: [
            {
              id: "test-meta-attr",
              name: "target-role",
              value: "Stopped",
            },
          ],
        },
      ],
    ],
    additionalRouteList: [
      mock.route.resourceEnable({
        clusterName,
        resourceOrTagIds: [fenceDeviceId],
        response,
      }),
    ],
  });

describe("Fence device enable", () => {
  afterEach(mock.stop);

  it("should run sucessfully", async () => {
    mockForEnable();
    await launchTask(fenceDeviceId);

    await appConfirm.run(confirmTitle);
    await isVisible(marks.notifications.toast.success);
  });

  it("should display error on fail", async () => {
    mockForEnable({
      json: responses.lib.error([responses.lib.report.error({})]),
    });
    await launchTask(fenceDeviceId);

    await appConfirm.run(confirmTitle);
    await isVisible(marks.notifications.toast.error);
  });
});
