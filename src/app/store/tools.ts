import { ActionPayload } from "app/store/actions";

const fenceDeviceNamePrefix = "stonith:";

export const uprefixFenceAgentName = (rawName: string) =>
  rawName.startsWith(fenceDeviceNamePrefix)
    ? rawName.slice(fenceDeviceNamePrefix.length)
    : rawName;

export const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1);

export const labelize = (rawName: string) =>
  rawName
    .split(/\s|_|-/g)
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(" ");

export const getNVPairTypeLabel = (
  owner: ActionPayload["CLUSTER.NVPAIRS.SAVE"]["owner"],
) => {
  switch (owner.type) {
    case "resource-meta":
      return "meta";
    case "node-attr":
      return "node";
    default:
      return "utilization";
  }
};
