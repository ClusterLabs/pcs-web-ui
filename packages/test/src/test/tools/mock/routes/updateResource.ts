import {endpoints} from "app/backend/endpoints";

import type {RouteResponse} from "../mock";

import {paramsToBody} from "./tools";

const {url, params} = endpoints.updateResource;

export const updateResource = ({
  clusterName,
  resourceId,
  attributes,
  response,
}: {
  clusterName: string;
  resourceId: string;
  attributes: Record<string, string>;
  response?: RouteResponse;
}) => ({
  url: url({clusterName}),
  body: paramsToBody(
    params({
      resourceId,
      attributes,
    }),
  ),
  ...(response ?? {text: JSON.stringify({})}),
});
