import {endpoints} from "app/backend/endpoints";
import {paramsToBody} from "./tools";
import type {RouteResponse} from "../mock";

const {url, params} = endpoints.removeResource;

export const removeResource = ({
  resourceId,
  isStonith,
  force,
  response,
}: {
  resourceId: string;
  isStonith?: boolean;
  force?: boolean;
  response?: RouteResponse;
}) => ({
  url,
  body: paramsToBody(
    params({
      resourceId,
      isStonith: isStonith ?? false,
      force: force ?? false,
    }),
  ),
  ...(response ?? {text: ""}),
});
