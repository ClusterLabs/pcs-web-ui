import { fillForm as fillAuthForm } from "../auth";

import { prepareCommonTask } from "./utils";

const commonTask = prepareCommonTask<"Enter node name" | "Check node name">({
  taskKey: "task-cluster-import",
  openKey: "task-launch add-existing-cluster",
});

const { inView, selectors } = commonTask;

const task = {
  ...commonTask,
  waitForCheckNodeSuccess: async () =>
    await page.waitForSelector(inView("prepare-node-success")),

  fillNodeName: async (nodeName: string) =>
    await page.type(inView("node-name"), nodeName),

  fillAuthForm: async (
    nodeName: string,
    password: string,
    addr: string,
    port: string,
  ) => {
    await page.waitForSelector(inView("prepare-node-auth"));
    await fillAuthForm(nodeName, selectors.task, password, addr, port);
  },
};
export { task };
