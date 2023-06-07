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
    setupCluster: {},
  },
};

type StructurePaths<STRUCTURE extends object> = {
  [KEY in keyof STRUCTURE & (string | number)]: STRUCTURE[KEY] extends object
    ? `${KEY}` | `${KEY}.${StructurePaths<STRUCTURE[KEY]>}`
    : `${KEY}`;
}[keyof STRUCTURE & (string | number)];

export type Path = StructurePaths<typeof structure>;

export const dataTest = (path: Path) => {
  const lastIndexOfDot = path.lastIndexOf(".");
  return lastIndexOfDot === -1 ? path : path.slice(lastIndexOfDot + 1);
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SubStructure extends Record<string, SubStructure> {}
