import * as t from "io-ts";

import { postForJson } from "../calls";
import { ApiCall, createResult, validateShape } from "../tools";

const ApiResourceRefreshCleanup = t.union([
  t.type({
    success: t.literal("true"),
  }),
  t.type({
    error: t.literal("true"),
    stdout: t.string,
    stderror: t.string,
  }),
]);
type Result = t.TypeOf<typeof ApiResourceRefreshCleanup>;

export const resourceRefresh: ApiCall<Result> = async ({
  clusterUrlName,
  resourceId,
}: {
  clusterUrlName: string;
  resourceId: string;
}) => {
  const raw = await postForJson(`/managec/${clusterUrlName}/resource_refresh`, [
    ["resource", resourceId],
    ["strict", "1"],
  ]);
  return createResult<Result>(
    raw,
    validateShape(raw, ApiResourceRefreshCleanup),
  );
};

export const resourceCleanup: ApiCall<Result> = async ({
  clusterUrlName,
  resourceId,
}: {
  clusterUrlName: string;
  resourceId: string;
}) => {
  const raw = await postForJson(`/managec/${clusterUrlName}/resource_cleanup`, [
    ["resource", resourceId],
    ["strict", "1"],
  ]);
  return createResult<Result>(
    raw,
    validateShape(raw, ApiResourceRefreshCleanup),
  );
};
