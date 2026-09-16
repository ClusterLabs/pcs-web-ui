import {endpoints} from "app/backend/endpoints";

import * as responses from "dev/responses";

export const getPermissions = ({
  permissions,
}: {
  clusterName: string;
  permissions?: ReturnType<typeof responses.permissions>;
}) => ({
  url: endpoints.getPermissions.url,
  json: permissions || responses.permissions(),
});
