import {endpoints} from "app/backend/endpoints";

import * as responses from "dev/responses";

import type {RouteResponse} from "../mock";

export const getPermissions = ({
  permissions,
  response,
}: {
  permissions?: ReturnType<typeof responses.permissions>;
  response?: RouteResponse;
}) => ({
  url: endpoints.getPermissions.url,
  ...(response ?? {json: permissions || responses.permissions()}),
});
