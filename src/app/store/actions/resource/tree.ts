export type ResourceTreeActions = {
  "RESOURCE.TREE.ITEM.TOGGLE": {
    type: "RESOURCE.TREE.ITEM.TOGGLE";
    key: {clusterName: string};
    payload: {
      itemId: string;
    };
  };
};
