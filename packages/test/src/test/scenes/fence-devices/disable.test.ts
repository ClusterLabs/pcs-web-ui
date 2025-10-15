import {mock} from "test/tools";
import {clusterName, goToFenceDevice, mockWithStonith} from "./common";
import * as responses from "dev/responses";

const fenceDeviceId = "F1";
const {fenceDeviceDisable: task} = marks.task;

const runTask = async (id: string) => {
  await goToFenceDevice(id);
  await click(marks.cluster.fenceDevices.currentFenceDevice.toolbar.disable);
  await click(task.run);
};

const mockForDisable = (response?: mock.RouteResponse) =>
  mockWithStonith({
    fenceDeviceIdList: [fenceDeviceId],
    additionalRouteList: [
      mock.route.resourceDisable({
        clusterName,
        resourceOrTagIds: [fenceDeviceId],
        response,
      }),
    ],
  });

describe("Fence device disable", () => {
  afterEach(mock.stop);

  it("should run sucessfully", async () => {
    mockForDisable();
    await runTask(fenceDeviceId);
    await isVisible(task.success);
  });

  it("should offer proceed anyway on forceable error", async () => {
    mockForDisable({
      json: responses.lib.error([
        responses.lib.report.error({
          severity: {level: "ERROR", force_code: "FORCE"},
        }),
      ]),
    });
    await runTask(fenceDeviceId);
    await isVisible(task.unsuccess.proceedAnyway);
  });

  it("should not offer proceed anyway on non-forceable error", async () => {
    mockForDisable({
      json: responses.lib.error([responses.lib.report.error({})]),
    });
    await runTask(fenceDeviceId);
    await isVisible(task.unsuccess);
    await isAbsent(task.unsuccess.proceedAnyway);
  });
});
