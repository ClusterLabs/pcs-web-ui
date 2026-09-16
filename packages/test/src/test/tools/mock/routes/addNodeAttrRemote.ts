import {endpoints} from "app/backend/endpoints";

import type {RouteResponse} from "../mock";

import {paramsToBody} from "./tools";

export const addNodeAttrRemote = ({
  nodeName,
  name,
  value,
  response,
}: {
  nodeName: string;
  name: string;
  value: string;
  response?: RouteResponse;
}) => ({
  url: endpoints.addNodeAttrRemote.url,
  body: paramsToBody(
    endpoints.addNodeAttrRemote.params({nodeName, name, value}),
  ),
  ...(response ?? {text: ""}),
});
