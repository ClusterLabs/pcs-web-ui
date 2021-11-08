import { CallResult, endpoints, http } from "./tools";

const { url } = endpoints.permissions;

export const savePermissions = (
  clusterName: string,
  permissionName: string,
  payload: {
    permissions: {
      name: string;
      type: string;
      allow: string[];
    }[];
  },
): CallResult =>
  http.post(url({ clusterName }), {
    payload,
  });
