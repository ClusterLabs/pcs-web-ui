import { endpoints } from "app/backend/endpoints";

import { RouteResponse } from "test/tools/interception";

import { paramsToBody } from "./tools";

const { url, params } = endpoints.updateFenceDevice;

export const updateFenceDevice = ({
  clusterName,
  fenceDeviceId,
  attributes,
  response,
}: {
  clusterName: string;
  fenceDeviceId: string;
  attributes: Record<string, string>;
  response?: RouteResponse;
}) => ({
  url: url({ clusterName }),
  body: paramsToBody(
    params({
      resourceId: fenceDeviceId,
      attributes,
    }),
  ),
  ...(response ?? { text: JSON.stringify({}) }),
});
