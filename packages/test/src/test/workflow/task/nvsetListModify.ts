import {dt} from "test/tools/selectors";

import {prepareCommonTask} from "./utils";

const task = ({launchKey}: {launchKey: string}) => {
  const commonTask = prepareCommonTask<
    "Name and type" | "Instance attributes" | "Settings" | "Review"
  >({
    taskKey: "nvpair-edit",
    openKey: `${launchKey}`,
  });

  const {selectors: commonSelectors, inView} = commonTask;

  const selectors = {
    ...commonSelectors,
    name: inView("nvpair-create", "name"),
    value: inView("nvpair-create", "value"),
  };

  return {
    ...commonTask,
    fillForm: async ({name, value}: {name: string; value: string}) => {
      await page.type(selectors.name, name);
      await page.type(selectors.value, value);
    },
    run: async () => {
      await page.click(dt("task-next"));
    },
    selectors,
  };
};
export {task};
