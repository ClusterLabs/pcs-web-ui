import { ActionPayload } from "app/store/actions";
const fenceDeviceNamePrefix = "stonith:";

export const uprefixFenceAgentName = (rawName: string) =>
  rawName.startsWith(fenceDeviceNamePrefix)
    ? rawName.slice(fenceDeviceNamePrefix.length)
    : rawName;

export const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1);

export const getNVPairTypeLabel = (
  owner: ActionPayload["CLUSTER.NVPAIRS.SAVE"]["owner"],
) => {
  switch (owner.type) {
    case "resource-meta":
      return "meta";
    default:
      return "utilization";
  }
};
