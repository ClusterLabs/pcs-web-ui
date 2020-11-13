export type ClusterWizardActions = {
  "CLUSTER.WIZARD.VALIDATION.SHOW": {
    type: "CLUSTER.WIZARD.VALIDATION.SHOW";
    payload: {
      clusterUrlName: string;
    };
  };

  "CLUSTER.WIZARD.VALIDATION.HIDE": {
    type: "CLUSTER.WIZARD.VALIDATION.HIDE";
    payload: {
      clusterUrlName: string;
    };
  };
};
