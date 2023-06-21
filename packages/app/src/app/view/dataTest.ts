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
      setupCluster: {},
      addExistingCluster: {},
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
    },
    nameAndNodesFooter: {
      next: {},
      back: {},
      cancel: {},
    },
    prepareNodesFooter: {
      next: {},
      back: {},
      cancel: {},
      reviewAndFinish: {},
    },
    reviewFooter: {
      next: {},
      back: {},
      cancel: {},
    },
    success: {
      close: {},
      startAndClose: {},
    },
    unsuccess: {
      back: {},
      proceedAnyway: {},
      cancel: {},
    },
    communicationError: {
      tryAgain: {},
      cancel: {},
    },
    reportList: {
      report: {},
    },
  },
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
