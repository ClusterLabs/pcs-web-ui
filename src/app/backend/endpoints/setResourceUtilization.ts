import { endpoint } from "./endpoint";

export const setResourceUtilization = endpoint({
  url: ({ clusterName }: { clusterName: string }) =>
    `/managec/${clusterName}/set_resource_utilization`,
  method: "post",
  params: ({
    resourceId,
    name,
    value,
  }: {
    resourceId: string;
    name: string;
    value: string;
  }): [string, string][] => [
    ["resource_id", resourceId],
    ["name", name],
    ["value", value],
  ],
  payload: undefined,
  validate: undefined,
  shape: undefined,
});
