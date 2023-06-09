// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SubStructure extends Record<string, SubStructure> {}

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
    setupCluster: {
      nameAndNodes: {
        clusterName: {},
        node: {
          name: {},
        },
      },
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
  <PATH extends Path>(_path: PATH) =>
  (subPath: SubPath<PATH, typeof structure>) =>
    last(subPath);
