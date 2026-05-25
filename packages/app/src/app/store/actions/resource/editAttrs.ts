export type ResourceEditAttrsActions = {
  "RESOURCE.EDIT_ATTRS.OPEN": {
    type: "RESOURCE.EDIT_ATTRS.OPEN";
    key: {clusterName: string};
    // the same shapes as in cluster status / pcmkAgent; but derivation from
    // cluster status / pcmkAgent would be too complicated (would require take
    // cluster status/pcmkAgent from reducer). So, we will work with independent
    // but compatible types here
    payload: {
      clusterName: string;
      resourceId: string;
      resourceAttrs: Record<string, string>;
      agentParameters: {
        name: string;
        type: string;
        shortdesc: string | null;
        longdesc: string | null;
        default: string | number | null;
        required: boolean;
        advanced: boolean;
        deprecated: boolean;
        deprecated_by: string[];
      }[];
    };
  };

  "RESOURCE.EDIT_ATTRS.UPDATE": {
    type: "RESOURCE.EDIT_ATTRS.UPDATE";
    key: {clusterName: string};
    payload: {
      name: string;
      value: string;
    };
  };

  "RESOURCE.EDIT_ATTRS.RUN": {
    type: "RESOURCE.EDIT_ATTRS.RUN";
    key: {clusterName: string};
    payload: {
      resourceId: string;
      attributes: Record<string, string>;
    };
  };

  "RESOURCE.EDIT_ATTRS.RUN.OK": {
    type: "RESOURCE.EDIT_ATTRS.RUN.OK";
    key: {clusterName: string};
  };

  "RESOURCE.EDIT_ATTRS.RUN.ERROR": {
    type: "RESOURCE.EDIT_ATTRS.RUN.ERROR";
    key: {clusterName: string};
    payload: {
      message: string;
    };
  };

  "RESOURCE.EDIT_ATTRS.RUN.ERROR.RECOVER": {
    type: "RESOURCE.EDIT_ATTRS.RUN.ERROR.RECOVER";
    key: {clusterName: string};
  };
};
