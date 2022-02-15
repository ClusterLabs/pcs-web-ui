import { wizardCreateFooterDataTest as createFooterDataTest } from "app/view/share/task/wizardCreateFooterDataTest";

import { mkXPath } from "test/tools/selectors";

export const clickNextFrom = <STEP_NAME extends string>(
  contexts: string | string[],
) => {
  const allContexts = Array.isArray(contexts) ? contexts : [contexts];
  return async (stepName: STEP_NAME) => {
    await page.click(
      mkXPath(...allContexts, createFooterDataTest(stepName), "task-next"),
    );
  };
};

export const clickBackFrom = <STEP_NAME extends string>(
  contexts: string | string[],
) => {
  const allContexts = Array.isArray(contexts) ? contexts : [contexts];
  return async (stepName: STEP_NAME) => {
    await page.click(
      mkXPath(...allContexts, createFooterDataTest(stepName), "task-back"),
    );
  };
};
