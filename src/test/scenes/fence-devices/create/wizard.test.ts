import * as responses from "dev/responses";

import { dt } from "test/tools/selectors";
import { intercept, route, shortcuts } from "test/tools";

import { TASK, url } from "./common";

const fenceDeviceName = "F1";
const clusterName = "actions";
const agentName = "fence_apc";
const ip = "127.0.0.1";
const username = "user1";

const assertReview = async (
  contextSelector: string,
  nameValueMap: Record<string, string>,
) => {
  await page.waitForSelector(contextSelector);
  Object.keys(nameValueMap).forEach(async (name) => {
    const foundValues = await page.$$eval(
      dt(contextSelector, `${name}-review-value`),
      el => el.map(e => (e as HTMLElement).innerText),
    );

    expect(foundValues).toHaveLength(1);
    expect(foundValues[0]).toEqual(nameValueMap[name]);
  });
};

describe("Fence device create task", () => {
  afterEach(intercept.stop);

  it("should succesfully create new fence device", async () => {
    shortcuts.interceptWithCluster(clusterName, [
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
    ]);
    page.goto(url.TASK);
    await page.type(TASK.NAME, fenceDeviceName);
    await page.click(TASK.AGENT_SELECT);
    await page.click(`${TASK.AGENT} :text("${agentName}")`);
    await page.click(TASK.NEXT);
    await page.type(TASK.ATTR("ip"), ip);
    await page.type(TASK.ATTR("username"), username);
    await page.click(TASK.NEXT);
    //skip settings
    await page.click(TASK.NEXT);
    await assertReview(TASK.VIEW, {
      name: "F1",
      agentName: "fence_apc",
      instanceAttr_ip: "127.0.0.1",
    });
    await page.click(TASK.NEXT);
    await page.waitForSelector(TASK.SUCCESS);
  });
});
