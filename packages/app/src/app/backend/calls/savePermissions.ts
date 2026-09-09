import {type CallResult, endpoints, http} from "./tools";

const {url, params} = endpoints.permissionsSave;

export const savePermissions = (
  permissionList: Parameters<typeof params>[0]["permissionList"],
): CallResult => http.post(url, {params: params({permissionList})});
