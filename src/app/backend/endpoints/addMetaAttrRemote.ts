import { endpoint } from "./endpoint";

export const addMetaAttrRemote = endpoint({
  url: ({ clusterName }: { clusterName: string }) =>
    `/managec/${clusterName}/add_meta_attr_remote`,
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
    ["res_id", resourceId],
    ["key", name],
    ["value", value],
  ],
  payload: undefined,
  validate: undefined,
  shape: undefined,
});
