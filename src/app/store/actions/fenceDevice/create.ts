export type FenceDeviceCreateActions = {
  "FENCE_DEVICE.CREATE.UPDATE": {
    type: "FENCE_DEVICE.CREATE.UPDATE";
    key: { clusterName: string };
    payload: {
      agentName?: string;
      fenceDeviceName?: string;
      clone?: boolean;
      promotable?: boolean;
      disabled?: boolean;
      instanceAttrs?: Record<string, string>;
      useGroup?: "no" | "existing" | "new";
      group?: string;
    };
  };

  "FENCE_DEVICE.CREATE.CLOSE": {
    type: "FENCE_DEVICE.CREATE.CLOSE";
    key: { clusterName: string };
  };
};
