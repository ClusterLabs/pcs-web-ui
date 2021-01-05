export type ClusterWizardActions = {
  "CLUSTER.WIZARD.VALIDATION.SHOW": {
    type: "CLUSTER.WIZARD.VALIDATION.SHOW";
    key: { clusterName: string };
  };

  "CLUSTER.WIZARD.VALIDATION.HIDE": {
    type: "CLUSTER.WIZARD.VALIDATION.HIDE";
    key: { clusterName: string };
  };
};
