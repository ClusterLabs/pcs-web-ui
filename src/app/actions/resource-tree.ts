export type ResourceTreeActions = {
  ToggleItem: {
    type: "RESOURCE_TREE.ITEM.TOGGLE";
    payload: {
      clusterUrlName: string;
      itemId: string;
    };
  };
};
