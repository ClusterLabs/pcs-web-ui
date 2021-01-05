export type ClusterWizardActions = {
  "CLUSTER.WIZARD.VALIDATION.SHOW": {
    type: "CLUSTER.WIZARD.VALIDATION.SHOW";
    id: { cluster: string };
  };

  "CLUSTER.WIZARD.VALIDATION.HIDE": {
    type: "CLUSTER.WIZARD.VALIDATION.HIDE";
    id: { cluster: string };
  };
};
