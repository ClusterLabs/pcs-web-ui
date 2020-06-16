import { ApiPrimitive } from "app/backend/types/clusterStatus";

import { Issue, Primitive, ResourceStatusInfo } from "../../types";
import { transformIssues } from "../issues";
import { buildStatus, isDisabled } from "./statusInfoList";

const buildStatusInfoList = (
  apiPrimitive: ApiPrimitive,
): {
  resourceStatusInfo: ResourceStatusInfo[];
  issues: Issue[];
} => {
  const infoList: ResourceStatusInfo[] = [];
  const issues: Issue[] = [];

  // warning
  if (apiPrimitive.crm_status.some(s => !s.managed)) {
    issues.push({
      severity: "WARNING",
      message: "Resource is unmanaged",
    });
    infoList.push({ label: "UNMANAGED", severity: "WARNING" });
  }

  if (isDisabled(apiPrimitive)) {
    issues.push({
      severity: "WARNING",
      message: "Resource is disabled",
    });
    infoList.push({ label: "DISABLED", severity: "WARNING" });
  }

  if (infoList.length > 0) {
    return {
      resourceStatusInfo: infoList,
      issues,
    };
  }

  // ok
  if (apiPrimitive.crm_status.some(s => s.active)) {
    return {
      resourceStatusInfo: [{ label: "RUNNING", severity: "OK" }],
      issues,
    };
  }

  // error
  if (
    apiPrimitive.crm_status.some(s => s.failed)
    || apiPrimitive.operations.some(
      o =>
        !(
          o.rc_code === 0
          // 7: OCF_NOT_RUNNING: The resource is safely stopped.
          || (o.operation === "monitor" && o.rc_code === 7)
          // 8: OCF_RUNNING_MASTER: The resource is running in master mode.
          // 193: PCMK_OCF_UNKNOWN: The resource operation is still in progress.
          || [8, 193].includes(o.rc_code)
        ),
    )
  ) {
    return {
      resourceStatusInfo: [{ label: "FAILED", severity: "ERROR" }],
      issues: [{ severity: "ERROR", message: "Resource failed" }],
    };
  }
  return {
    resourceStatusInfo: [{ label: "BLOCKED", severity: "ERROR" }],
    issues: [{ severity: "ERROR", message: "Resource is blocked" }],
  };
};

export const toPrimitive = (apiResource: ApiPrimitive): Primitive => {
  const { resourceStatusInfo, issues } = buildStatusInfoList(apiResource);
  return {
    id: apiResource.id,
    itemType: "primitive",
    status: buildStatus(resourceStatusInfo),
    issueList: transformIssues(apiResource).concat(issues),
    class: apiResource.class,
    provider: apiResource.provider,
    type: apiResource.type,
    agentName: `${apiResource.class}:${apiResource.provider}:${apiResource.type}`,
    // Decision: Last instance_attr wins!
    instanceAttributes: apiResource.instance_attr.reduce(
      (attrMap, nvpair) => ({
        ...attrMap,
        [nvpair.name]: { id: nvpair.id, value: nvpair.value },
      }),
      {},
    ),
  };
};
