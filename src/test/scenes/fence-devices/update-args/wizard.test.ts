import * as responses from "dev/responses";

import { dt, mkXPath } from "test/tools/selectors";
import { intercept, location, route, shortcuts } from "test/tools";

const clusterName = "resourcesForTest";
const fenceDeviceId = "F1";
const agentName = "fence_apc";

const editButton = dt("task fence-device-args-edit-arguments");

const taskView = dt("fence-device-args-edit");
const task = {
  argField: (argName: string) => dt(`fence-device-arg-${argName}`),
  run: mkXPath("task-next"),
  success: dt(taskView, "task-success"),
  error: dt(taskView, "task-error"),
};

const url = {
  arguments: `${location.fenceDevice({
    clusterName,
    fenceDeviceId,
  })}/arguments`,
};

const attributes = {
  cmd_prompt: "cmd:prompt",
  ip: "127.0.0.1",
};

const runArgsUpdate = async () => {
  await page.goto(url.arguments);
  await page.click(editButton);
  await page.type(task.argField("cmd_prompt"), attributes.cmd_prompt);
  await page.type(task.argField("ip"), attributes.ip);
  await page.click(task.run);
};

const interceptForFenceDeviceArgsUpdate = (
  additionalRouteList: Parameters<
    typeof shortcuts.interceptWithCluster
  >[0]["additionalRouteList"],
) =>
  shortcuts.interceptWithCluster({
    clusterName,
    additionalRouteList: [
      route.stonithAgentDescribeAgent({
        clusterName,
        agentName,
        agentData: responses.fenceAgentMetadata.ok,
      }),
      ...(additionalRouteList ?? []),
    ],
  });

describe("Fence device arguments update task", () => {
  afterEach(intercept.stop);

  it("should update arguments", async () => {
    interceptForFenceDeviceArgsUpdate([
      route.updateFenceDevice({
        clusterName,
        fenceDeviceId,
        attributes,
      }),
    ]);
    await runArgsUpdate();
    await page.waitForSelector(task.success);
  });

  it("should deal with backend error", async () => {
    interceptForFenceDeviceArgsUpdate([
      route.updateFenceDevice({
        clusterName,
        fenceDeviceId,
        attributes,
        response: {
          text: JSON.stringify({
            error: "true",
            stdout: "some stdout",
            stderr: "some stderr",
          }),
        },
      }),
    ]);
    await runArgsUpdate();
    await page.waitForSelector(task.error);
  });
});
