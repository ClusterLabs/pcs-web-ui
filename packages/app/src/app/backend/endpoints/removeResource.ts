import {endpoint} from "./endpoint";

export const removeResource = endpoint({
  url: "/managec/remove_resource",
  method: "post",
  params: ({
    resourceId,
    isStonith,
    force,
  }: {
    resourceId: string;
    isStonith: boolean;
    force: boolean;
  }): [string, string][] => [
    ["no_error_if_not_exists", "true"],
    [`resid-${resourceId}`, "true"],
    ...(isStonith ? [["is-stonith", "true"] as [string, string]] : []),
    ...(force ? [["force", "1"] as [string, string]] : []),
  ],
  payload: undefined,
  validate: undefined,
  shape: undefined,
});
