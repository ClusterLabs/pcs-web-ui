import { ActionPayload } from "app/store/actions";

const fenceDeviceNamePrefix = "stonith:";

export const uprefixFenceAgentName = (rawName: string) =>
  rawName.startsWith(fenceDeviceNamePrefix)
    ? rawName.slice(fenceDeviceNamePrefix.length)
    : rawName;

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

export const isCibTrue = (value: string): boolean =>
  ["true", "on", "yes", "y", "1"].includes(value.toLowerCase());
