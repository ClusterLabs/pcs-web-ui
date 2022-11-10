import {wizardCreateFooterDataTest as createFooterDataTest} from "app/view/share/task/wizardCreateFooterDataTest";

import {dt, mkXPath} from "test/tools/selectors";

import {assertReview} from "./common";

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

export const prepareCommonTaskSimple = ({
  taskKey,
  openKey,
}: {
  taskKey: string;
  openKey: string;
}) => {
  const inView = (...keys: string[]) => mkXPath(taskKey, ...keys);
  const selectors = {
    task: dt(taskKey),
  };
  return {
    taskKey,
    openKey,
    inView,
    open: async () => {
      await page.click(dt(openKey));
      await page.waitForSelector(dt(taskKey));
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
    run: async () => {
      await page.click(dt("task-next"));
    },
    selectors,
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
  const selectors = {
    task: dt(taskKey),
  };
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
    selectors,
    nextFrom: clickMoveFrom<STEP_NAME>(taskKey, "task-next"),
    backFrom: clickMoveFrom<STEP_NAME>(taskKey, "task-back"),
    assertReview: async (nameValueMap: Parameters<typeof assertReview>[1]) =>
      await assertReview(selectors.task, nameValueMap),
  };
};
