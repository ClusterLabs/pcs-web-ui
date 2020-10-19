export type Update = {
  type: "NODE.ADD.UPDATE";
  payload: {
    clusterUrlName: string;
    state: {
      nodeName?: string;
    };
  };
};
