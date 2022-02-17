import { wizardCreateFooterDataTest as createFooterDataTest } from "app/view/share/task/wizardCreateFooterDataTest";

import { dt, mkXPath } from "test/tools/selectors";

const clickMoveFrom = <STEP_NAME extends string>(
  contexts: string | string[],
  buttonKey: "task-next" | "task-back",
) => {
  const allContexts = Array.isArray(contexts) ? contexts : [contexts];
  return async (stepName: STEP_NAME) => {
    await page.click(
      mkXPath(...allContexts, createFooterDataTest(stepName), buttonKey),
    );
  };
};

export const prepareCommonTask = <STEP_NAME extends string>({
  taskKey,
  openKey,
}: {
  taskKey: string;
  openKey: string;
}) => {
  const inView = (...keys: string[]) => mkXPath(taskKey, ...keys);
  return {
    taskKey,
    openKey,
    inView,
    open: async () => {
      await page.click(dt(openKey));
    },
    close: async () => {
      await page.click(inView("task-close"));
    },
    waitForSuccess: async () => {
      await page.waitForSelector(inView("task-success"));
    },
    waitForError: async () => {
      await page.waitForSelector(inView("task-error"));
    },
    selectors: {
      task: dt(taskKey),
      success: inView("task-success"),
      close: inView("task-close"),
      error: inView("task-error"),
    },
    nextFrom: clickMoveFrom<STEP_NAME>(taskKey, "task-next"),
    backFrom: clickMoveFrom<STEP_NAME>(taskKey, "task-back"),
  };
};
