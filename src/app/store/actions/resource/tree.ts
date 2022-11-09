export type ResourceTreeActions = {
  "RESOURCE.TREE.ITEM.TOGGLE": {
    type: "RESOURCE.TREE.ITEM.TOGGLE";
    key: {clusterName: string};
    payload: {
      itemId: string;
    };
  };

  "RESOURCE.TREE.ITEM.OPEN.EXCLUSIVE": {
    type: "RESOURCE.TREE.ITEM.OPEN.EXCLUSIVE";
    key: {clusterName: string};
    payload: {
      itemIdList: string[];
    };
  };
};
