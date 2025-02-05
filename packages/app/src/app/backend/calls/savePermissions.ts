import {type CallResult, endpoints, http} from "./tools";

const {url, params} = endpoints.permissionsSave;

export const savePermissions = (
  clusterName: string,
  permissionList: Parameters<typeof params>[0]["permissionList"],
): CallResult =>
  http.post(url({clusterName}), {
    params: params({clusterName: clusterName, permissionList}),
  });
