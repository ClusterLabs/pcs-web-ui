import {endpoints} from "app/backend/endpoints";

import {RouteResponse} from "../interception";

import {paramsToBody} from "./tools";

export const addMetaAttrRemote = ({
  clusterName,
  resourceId,
  name,
  value,
  response,
}: {
  clusterName: string;
  resourceId: string;
  name: string;
  value: string;
  response?: RouteResponse;
}) => ({
  url: endpoints.addMetaAttrRemote.url({clusterName}),
  body: paramsToBody(
    endpoints.addMetaAttrRemote.params({resourceId, name, value}),
  ),
  ...(response ?? {text: ""}),
});
