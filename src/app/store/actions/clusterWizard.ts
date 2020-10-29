export type ClusterWizard = {
  ValidationShow: {
    type: "CLUSTER_WIZARD.VALIDATION.SHOW";
    payload: {
      clusterUrlName: string;
    };
  };

  ValidationHide: {
    type: "CLUSTER_WIZARD.VALIDATION.HIDE";
    payload: {
      clusterUrlName: string;
    };
  };
};
