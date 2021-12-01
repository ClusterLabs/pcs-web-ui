const fenceDeviceNamePrefix = "stonith:";

export const uprefixFenceAgentName = (rawName: string) =>
  rawName.startsWith(fenceDeviceNamePrefix)
    ? rawName.slice(fenceDeviceNamePrefix.length)
    : rawName;
