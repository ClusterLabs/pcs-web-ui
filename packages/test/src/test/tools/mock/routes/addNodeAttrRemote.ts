import {endpoints} from "app/backend/endpoints";

import {RouteResponse} from "../mock";

import {paramsToBody} from "./tools";

export const addNodeAttrRemote = ({
  clusterName,
  nodeName,
  name,
  value,
  response,
}: {
  clusterName: string;
  nodeName: string;
  name: string;
  value: string;
  response?: RouteResponse;
}) => ({
  url: endpoints.addNodeAttrRemote.url({clusterName}),
  body: paramsToBody(
    endpoints.addNodeAttrRemote.params({nodeName, name, value}),
  ),
  ...(response ?? {text: ""}),
});
