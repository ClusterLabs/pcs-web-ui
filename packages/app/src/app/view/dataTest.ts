// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SubStructure extends Record<string, SubStructure> {}

// Avoid ambiguous paths. E.g. if there is `dashboard.toolbar.setupCluster` and
// also `setupCluster` then xpath `//*[@data-test="setupCluster"]` selects both.
//
// Tasks (wizards) are separated from "dashboard" or "clusterDetail" because
// theirs modality is done by element outside #root element of application.
//
// Don't use names:
// - mark
// - locator
// The structure is enhanced by this keys
export const structure = {
  clusterDetail: {},
  dashboard: {
    toolbar: {
      runSetupCluster: {},
      runAddExistingCluster: {},
    },
    clusterList: {
      cluster: {
        name: {},
        loaded: {
          issues: {},
          nodes: {},
          resources: {},
          fenceDevices: {},
        },
      },
    },
  },
  setupCluster: {
    nameAndNodes: {
      clusterName: {},
      node: {
        name: {},
      },
      next: {},
      back: {},
      cancel: {},
    },
    prepareNodes: {
      next: {},
      back: {},
      cancel: {},
      reviewAndFinish: {},
    },
    review: {
      next: {},
      back: {},
      cancel: {},
    },
    success: {
      close: {},
      startAndClose: {},
    },
  },
};

type MarkTools<KEY> = {
  mark: {"data-test": KEY};
};

type WithMarkTools<STRUCTURE extends SubStructure> = {
  [KEY in keyof STRUCTURE]: WithMarkTools<STRUCTURE[KEY]> & MarkTools<KEY>;
};

const createMarkTools = <KEY extends string>(key: KEY): MarkTools<KEY> => ({
  mark: {"data-test": key},
});

const addMarkTools = <STRUCTURE extends SubStructure>(
  structure: STRUCTURE,
  currentKey = "",
): WithMarkTools<STRUCTURE> =>
  Object.entries(structure).reduce<WithMarkTools<STRUCTURE>>(
    (structureWithLocators, [key, subStructure]) => ({
      ...structureWithLocators,
      [key]: addMarkTools(subStructure, key),
    }),
    (currentKey !== ""
      ? createMarkTools(currentKey)
      : {}) as WithMarkTools<STRUCTURE>,
  );

export const testMarks = addMarkTools(structure);
