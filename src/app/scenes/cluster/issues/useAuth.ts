export const useAuth = (initialNodeList: string[]) => {
  const state = {
    nodeMap: initialNodeList.reduce(
      (map, node) => ({ ...map, [node]: {} }),
      {},
    ),
  };
  return {
    state,
  };
};
