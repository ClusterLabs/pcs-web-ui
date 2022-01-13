export type FenceDeviceEditArgsActions = {
  "FENCE_DEVICE.EDIT_ARGS.OPEN": {
    type: "FENCE_DEVICE.EDIT_ARGS.OPEN";
    key: { clusterName: string };
    // the same shapes as in cluster status / pcmkAgent; but derivation from
    // cluster status / pcmkAgent would be too complicated (would require take
    // cluster status/pcmkAgent from reducer). So, we will work with independent
    // but compatible types here
    payload: {
      fenceDeviceId: string;
      fenceDeviceArguments: Record<string, string>;
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

  "FENCE_DEVICE.EDIT_ARGS.UPDATE": {
    type: "FENCE_DEVICE.EDIT_ARGS.UPDATE";
    key: { clusterName: string };
    payload: {
      name: string;
      value: string;
    };
  };

  "FENCE_DEVICE.EDIT_ARGS.RUN": {
    type: "FENCE_DEVICE.EDIT_ARGS.RUN";
    key: { clusterName: string };
    payload: {
      fenceDeviceId: string;
      attributes: Record<string, string>;
    };
  };

  "FENCE_DEVICE.EDIT_ARGS.RUN.OK": {
    type: "FENCE_DEVICE.EDIT_ARGS.RUN.OK";
    key: { clusterName: string };
  };

  "FENCE_DEVICE.EDIT_ARGS.RUN.ERROR": {
    type: "FENCE_DEVICE.EDIT_ARGS.RUN.ERROR";
    key: { clusterName: string };
    payload: {
      message: string;
    };
  };

  "FENCE_DEVICE.EDIT_ARGS.RUN.ERROR.RECOVER": {
    type: "FENCE_DEVICE.EDIT_ARGS.RUN.ERROR.RECOVER";
    key: { clusterName: string };
  };
};
