type FenceDeviceArgument = { id: string; value: string };
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
      fenceDeviceArguments: Record<string, FenceDeviceArgument>;
      agentParameters: {
        name: string;
        shortdesc: string | null;
        longdesc: string | null;
        default: string | number | null;
      }[];
    };
  };

  "FENCE_DEVICE.EDIT_ARGS.UPDATE": {
    type: "FENCE_DEVICE.EDIT_ARGS.UPDATE";
    key: { clusterName: string };
    payload: FenceDeviceArgument;
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
