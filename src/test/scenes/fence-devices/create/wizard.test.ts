import * as responses from "dev/responses";

import { intercept, route, shortcuts } from "test/tools";
import * as workflow from "test/workflow";

import { TASK, url } from "./common";

const fenceDeviceName = "F1";
const clusterName = "actions";
const agentName = "fence_apc";
const ip = "127.0.0.1";
const username = "user1";

describe("Fence device create task", () => {
  afterEach(intercept.stop);

  it("should succesfully create new fence device", async () => {
    shortcuts.interceptWithCluster({
      clusterName,
      additionalRouteList: [
        route.stonithAgentDescribeAgent({
          clusterName,
          agentName,
          agentData: responses.fenceAgentMetadata.ok,
        }),
        route.stonithCreate({
          clusterName,
          fenceDeviceName,
          agentName,
          instanceAttrs: { ip, username },
        }),
      ],
    });
    await page.goto(url.TASK);
    await page.type(TASK.NAME, fenceDeviceName);
    await page.click(TASK.AGENT_SELECT);
    await page.click(`${TASK.AGENT} :text("${agentName}")`);
    await page.click(TASK.NEXT);
    await page.type(TASK.ATTR("ip"), ip);
    await page.type(TASK.ATTR("username"), username);
    await page.click(TASK.NEXT);
    //skip settings
    await page.click(TASK.NEXT);
    await workflow.task.assertReview(TASK.VIEW, {
      name: "F1",
      agentName: "fence_apc",
      instanceAttr_ip: "127.0.0.1",
    });
    await page.click(TASK.NEXT);
    await page.waitForSelector(TASK.SUCCESS);
  });
});
