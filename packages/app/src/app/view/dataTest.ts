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
interface SubStructure extends Record<string, SubStructure> {}

export const isValidPath = (path: string): path is Path => {
  let currentSubStructure: SubStructure = structure;
  const parts = path.split(".");

  for (let i = 0; i < parts.length; i++) {
    if (!(parts[i] in currentSubStructure)) {
      return false;
    }
    currentSubStructure = currentSubStructure[parts[i]];
  }
  return true;
};

export default structure;
