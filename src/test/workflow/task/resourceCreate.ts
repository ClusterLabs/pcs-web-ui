import {select} from "../form";

import {prepareCommonTask} from "./utils";

const commonTask = prepareCommonTask<
  "Name and type" | "Instance attributes" | "Settings" | "Review"
>({
  taskKey: "task-resource-create",
  openKey: "task-launch create-resource",
});

const {selectors: commonSelectors, inView} = commonTask;

const selectors = {
  ...commonSelectors,
  resourceName: inView("resource-name"),
  agentName: inView("resource-agent"),
  attr: (attrName: string) => inView(`attr ${attrName}`),
};

const task = {
  ...commonTask,
  selectors,
  fillNameAndAgent: async (resourceName: string, agentName: string) => {
    await page.type(selectors.resourceName, resourceName);
    await select(selectors.agentName, agentName);
  },
  fillAttributes: async (nameValueMap: Record<string, string>) => {
    const nameValuePairs = Object.entries(nameValueMap);
    for (let i = 0; i < nameValuePairs.length; i++) {
      const [name, value] = nameValuePairs[i];
      await page.type(selectors.attr(name), value);
    }
  },
};
export {task};
