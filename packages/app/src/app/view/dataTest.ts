const structure = {
  "cluster-detail": {},
  dashboard: {
    toolbar: {
      "setup-cluster": {},
      "add-existing-cluster": {},
    },
    "cluster-list": {},
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

export default structure;
