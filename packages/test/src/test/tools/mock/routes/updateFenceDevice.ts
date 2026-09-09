import {endpoints} from "app/backend/endpoints";

import type {RouteResponse} from "../mock";

import {paramsToBody} from "./tools";

const {url, params} = endpoints.updateFenceDevice;

export const updateFenceDevice = ({
  fenceDeviceId,
  attributes,
  response,
}: {
  fenceDeviceId: string;
  attributes: Record<string, string>;
  response?: RouteResponse;
}) => ({
  url,
  body: paramsToBody(
    params({
      resourceId: fenceDeviceId,
      attributes,
    }),
  ),
  ...(response ?? {text: JSON.stringify({})}),
});
