import { dt } from "test/tools/selectors";

import { prepareCommonTask } from "./utils";

const commonTask = prepareCommonTask<
  "Name and type" | "Instance attributes" | "Settings" | "Review"
>({
  taskKey: "utilization-attribute-edit",
  openKey: "task-launch create-utilization-attribute",
});

const { selectors: commonSelectors, inView } = commonTask;

const selectors = {
  ...commonSelectors,
  name: inView("utilization-attr-create", "name"),
  value: inView("utilization-attr-create", "value"),
};

const task = {
  ...commonTask,
  fillForm: async ({ name, value }: { name: string; value: string }) => {
    await page.type(selectors.name, name);
    await page.type(selectors.value, value);
  },
  run: async () => {
    await page.click(dt("task-next"));
  },
  selectors,
};
export { task };
