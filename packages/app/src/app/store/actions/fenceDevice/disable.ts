export type FenceDeviceDisableActions = {
  "FENCE_DEVICE.DISABLE.INIT": {
    type: "FENCE_DEVICE.DISABLE.INIT";
    key: {clusterName: string};
    payload: {
      fenceDeviceName: string;
    };
  };
  "FENCE_DEVICE.DISABLE.CLOSE": {
    type: "FENCE_DEVICE.DISABLE.CLOSE";
    key: {clusterName: string};
  };
};
