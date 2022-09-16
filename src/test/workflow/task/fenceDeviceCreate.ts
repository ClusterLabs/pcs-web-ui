import { select } from "../form";

import { prepareCommonTask } from "./utils";

const commonTask = prepareCommonTask<
  "Name and type" | "Instance attributes" | "Settings" | "Review"
>({
  taskKey: "task-fence-device-create",
  openKey: "task fence-devices-create-fence-device",
});

const { selectors: commonSelectors, inView } = commonTask;

const selectors = {
  ...commonSelectors,
  fenceDeviceName: inView("fence-device-name"),
  agentName: inView("fence-device-agent"),
  attr: (attrName: string) => inView(`attr ${attrName}`),
};

const task = {
  ...commonTask,
  selectors,
  fillNameAndAgent: async (fenceDeviceName: string, agentName: string) => {
    await page.type(selectors.fenceDeviceName, fenceDeviceName);
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
export { task };
