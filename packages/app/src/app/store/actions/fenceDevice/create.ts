export type FenceDeviceCreateActions = {
  "FENCE_DEVICE.CREATE.INIT": {
    type: "FENCE_DEVICE.CREATE.INIT";
    payload: {
      clusterName: string;
    };
  };
  "FENCE_DEVICE.CREATE.UPDATE": {
    type: "FENCE_DEVICE.CREATE.UPDATE";
    payload: {
      agentName?: string;
      fenceDeviceName?: string;
      clone?: boolean;
      promotable?: boolean;
      disabled?: boolean;
      instanceAttrs?: Record<string, string>;
    };
  };

  "FENCE_DEVICE.CREATE.CLOSE": {
    type: "FENCE_DEVICE.CREATE.CLOSE";
  };
};
