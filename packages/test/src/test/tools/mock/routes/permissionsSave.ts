import {endpoints} from "app/backend/endpoints";

import {RouteResponse} from "../mock";

import {paramsToBody} from "./tools";

export const permissionsSave = ({
  clusterName,
  permissionList,
  response,
}: {
  clusterName: string;
  permissionList: Parameters<
    typeof endpoints.permissionsSave.params
  >[0]["permissionList"];
  response?: RouteResponse;
}) => ({
  url: endpoints.permissionsSave.url({clusterName}),
  body: paramsToBody(
    endpoints.permissionsSave.params({clusterName, permissionList}),
  ),
  ...(response ?? {text: "Permissions saved"}),
});
