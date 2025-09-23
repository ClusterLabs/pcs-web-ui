import {endpoints} from "app/backend/endpoints";

import type {RouteResponse} from "../mock";

import {paramsToBody} from "./tools";

export const addMetaAttrRemote = ({
  clusterName,
  resourceId,
  name,
  value,
  response,
  isStonith,
}: {
  clusterName: string;
  resourceId: string;
  name: string;
  value: string;
  response?: RouteResponse;
  isStonith?: boolean;
}) => ({
  url: endpoints.addMetaAttrRemote.url({clusterName}),
  body: paramsToBody(
    endpoints.addMetaAttrRemote.params({
      resourceId,
      name,
      value,
      isStonith: !!isStonith,
    }),
  ),
  ...(response ?? {text: ""}),
});
