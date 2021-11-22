import { CallResult, endpoints, http } from "./tools";

const { url, params } = endpoints.permissionsSave;

export const savePermissions = (
  clusterName: string,
  payload: {
    permissions: {
      name: string;
      type: string;
      allow: string[];
    }[];
  },
): CallResult =>
  http.post(url({ clusterName }), {
    params: params({ clusterName: clusterName, permissionParams: payload }),
  });
