import {notifications} from "./notifications";
import {dashboard} from "./dashboard";
import {cluster} from "./cluster";
import {task} from "./task";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SubStructure extends Record<string, SubStructure> {}

// Tasks (wizards) are separated from "dashboard" or "clusterDetail" because
// theirs modality is done by element outside #root element of application.
//
// Don't use names:
// - mark
// - locator
// - path
// The structure is enhanced by this keys (here or in tests)
export const structure = {
  notifications,
  dashboard,
  cluster,
  task,
};

type MarkTools = {
  mark: {"data-test": string};
};

type WithMarkTools<STRUCTURE extends SubStructure> = {
  [KEY in keyof STRUCTURE]: WithMarkTools<STRUCTURE[KEY]> & MarkTools;
};

const createMarkTools = <KEY extends string>(path: KEY[]): MarkTools => ({
  mark: {"data-test": path.join(".")},
});

const addMarkTools = <STRUCTURE extends SubStructure>(
  structure: STRUCTURE,
  path: string[] = [],
): WithMarkTools<STRUCTURE> =>
  Object.entries(structure).reduce<WithMarkTools<STRUCTURE>>(
    (structureWithLocators, [key, subStructure]) => ({
      ...structureWithLocators,
      [key]: addMarkTools(subStructure, [...path, key]),
    }),
    (path.length > 0 ? createMarkTools(path) : {}) as WithMarkTools<STRUCTURE>,
  );

export const testMarks = addMarkTools(structure);
