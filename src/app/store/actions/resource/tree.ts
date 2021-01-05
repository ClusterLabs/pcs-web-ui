export type ResourceTreeActions = {
  "RESOURCE.TREE.ITEM.TOGGLE": {
    type: "RESOURCE.TREE.ITEM.TOGGLE";
    id: { cluster: string };
    payload: {
      itemId: string;
    };
  };
};
