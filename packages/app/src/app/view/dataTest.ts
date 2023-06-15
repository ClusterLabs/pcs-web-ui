// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SubStructure extends Record<string, SubStructure> {}

// Avoid ambiguous paths. E.g. if there is `dashboard.toolbar.setupCluster` and
// also `setupCluster` then xpath `//*[@data-test="setupCluster"]` selects both.
//
// Tasks (wizards) are separated from "dashboard" or "clusterDetail" because
// theirs modality is done by element outside #root element of application.
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

type StructurePaths<STRUCTURE extends object> = {
  [KEY in keyof STRUCTURE & (string | number)]: STRUCTURE[KEY] extends object
    ? `${KEY}` | `${KEY}.${StructurePaths<STRUCTURE[KEY]>}`
    : `${KEY}`;
}[keyof STRUCTURE & (string | number)];

export type Path = StructurePaths<typeof structure>;

type SubPath<
  PREFIX extends string,
  STRUCTURE extends SubStructure,
> = PREFIX extends `${infer KEY}.${infer REMAINING}`
  ? KEY extends keyof STRUCTURE
    ? `${SubPath<REMAINING, STRUCTURE[KEY]>}`
    : never
  : PREFIX extends keyof STRUCTURE
  ? StructurePaths<STRUCTURE[PREFIX]>
  : never;

const afterLastDot = (path: string) => path.slice(path.lastIndexOf(".") + 1);

const last = (path: string) => ({"data-test": afterLastDot(path)});

export const dataTest = (path: Path) => last(path);

export const subDataTest =
  <PATH extends Path>(path: PATH) =>
  (subPath: SubPath<PATH, typeof structure> | ".") =>
    last(subPath === "." ? path : subPath);
