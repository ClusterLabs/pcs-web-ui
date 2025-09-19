import {endpoint} from "./endpoint";

export const addMetaAttrRemote = endpoint({
  url: ({clusterName}: {clusterName: string}) =>
    `/managec/${clusterName}/add_meta_attr_remote`,
  method: "post",
  params: ({
    resourceId,
    isStonith,
    name,
    value,
  }: {
    resourceId: string;
    isStonith: boolean;
    name: string;
    value: string;
  }): [string, string][] => [
    ["res_id", resourceId],
    ["key", name],
    ["value", value],
    ...(isStonith ? [["is-stonith", "true"] as [string, string]] : []),
  ],
  payload: undefined,
  validate: undefined,
  shape: undefined,
});
