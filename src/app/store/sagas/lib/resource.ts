export const formatResourcesMsg = (resourceNameList: string[]) =>
  (resourceNameList.length === 1
    ? `resource "${resourceNameList[0]}"`
    : `resources ${resourceNameList.map(r => `"${r}"`).join(", ")}`);
