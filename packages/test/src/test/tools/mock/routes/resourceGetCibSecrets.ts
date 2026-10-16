import * as responses from "dev/responses";

import type {RouteResponse} from "../mock";

import {libCluster} from "./libCluster";

export const resourceGetCibsecrets = (
  props: {queries: [string, string][]} & (
    | {
        resultData: {
          resource_secrets: {
            resource_id: string;
            name: string;
            value: string;
          }[];
        };
      }
    | {response: RouteResponse}
  ),
) => {
  const response: RouteResponse =
    "response" in props
      ? props.response
      : {json: responses.lib.success({data: props.resultData})};

  return libCluster({
    name: "resource-get-cibsecrets",
    payload: {queries: props.queries},
    response,
  });
};
