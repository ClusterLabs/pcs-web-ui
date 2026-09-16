import {endpoints} from "app/backend/endpoints";

import type {RouteResponse} from "../mock";

import {paramsToBody} from "./tools";

export const permissionsSave = ({
  permissionList,
  response,
}: {
  permissionList: Parameters<
    typeof endpoints.permissionsSave.params
  >[0]["permissionList"];
  response?: RouteResponse;
}) => ({
  url: endpoints.permissionsSave.url,
  body: paramsToBody(endpoints.permissionsSave.params({permissionList})),
  ...(response ?? {text: "Permissions saved"}),
});
