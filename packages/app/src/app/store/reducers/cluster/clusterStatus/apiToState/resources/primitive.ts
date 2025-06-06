import type {ActionPayload} from "app/store/actions";

import type {Cluster, Issue} from "../../types";
import {transformIssues} from "../issues";

import {buildStatus, isDisabled} from "./statusInfoList";

type ApiPrimitive = Extract<
  ActionPayload["CLUSTER.STATUS.FETCH.OK"]["resource_list"][number],
  {class_type: "primitive"; stonith: false}
>;

type Primitive = Extract<
  Cluster["resourceTree"][number],
  {itemType: "primitive"}
>;
type StatusInfoList = Primitive["status"]["infoList"];

const operationFailed = (operation: ApiPrimitive["operations"][number]) =>
  operation.rc_code !== 0 &&
  // 7: OCF_NOT_RUNNING: The resource is safely stopped.
  !(operation.rc_code === 7 && operation.operation === "monitor") &&
  // 8: OCF_RUNNING_MASTER: The resource is running in master mode.
  // 193: PCMK_OCF_UNKNOWN: The resource operation is still in progress.
  ![8, 193].includes(operation.rc_code);

const buildStatusInfoList = (
  apiPrimitive: ApiPrimitive,
): {
  resourceStatusInfo: StatusInfoList;
  issues: Issue[];
} => {
  const infoList: StatusInfoList = [];
  const issues: Issue[] = [];

  // warning
  if (apiPrimitive.crm_status.some(s => !s.managed)) {
    issues.push({
      severity: "WARNING",
      message: "Resource is unmanaged",
    });
    infoList.push({label: "UNMANAGED", severity: "WARNING"});
  }

  const primitiveIsDisabled = isDisabled(apiPrimitive);

  if (primitiveIsDisabled) {
    issues.push({
      severity: "WARNING",
      message: "Resource is disabled",
    });
    infoList.push({label: "DISABLED", severity: "WARNING"});
  }

  const someCrmStatusActive = apiPrimitive.crm_status.some(s => s.active);
  const someOperationFailed = apiPrimitive.operations.some(operationFailed);

  if (
    !primitiveIsDisabled &&
    !someCrmStatusActive &&
    !apiPrimitive.crm_status.some(s => s.failed) &&
    apiPrimitive.error_list.length === 0 &&
    someOperationFailed
  ) {
    infoList.push({label: "FAILED", severity: "ERROR"});
  } else if (!someCrmStatusActive && !primitiveIsDisabled) {
    issues.push({severity: "ERROR", message: "Resource is blocked"});
    infoList.push({label: "BLOCKED", severity: "ERROR"});
  } else if (someOperationFailed) {
    infoList.push({label: "FAILED OPERATIONS", severity: "WARNING"});
  }

  if (infoList.length > 0) {
    return {
      resourceStatusInfo: infoList,
      issues,
    };
  }

  // ok
  return {
    resourceStatusInfo: [{label: "RUNNING", severity: "OK"}],
    issues,
  };
};

export const toPrimitive = (
  apiResource: ApiPrimitive,
  context: {inClone: string | null; inGroup: string | null} = {
    inClone: null,
    inGroup: null,
  },
): Primitive => {
  const {resourceStatusInfo, issues} = buildStatusInfoList(apiResource);
  const {inClone, inGroup} = context;
  return {
    id: apiResource.id,
    itemType: "primitive",
    inClone,
    inGroup,
    status: buildStatus(resourceStatusInfo),
    issueList: transformIssues(apiResource).concat(issues),
    class: apiResource.class,
    provider: apiResource.provider,
    type: apiResource.type,
    agentName:
      apiResource.provider !== null
        ? `${apiResource.class}:${apiResource.provider}:${apiResource.type}`
        : `${apiResource.class}:${apiResource.type}`,
    // Decision: Last instance_attr wins!
    instanceAttributes: apiResource.instance_attr.reduce(
      (attrMap, nvpair) => ({
        ...attrMap,
        [nvpair.name]: {id: nvpair.id, value: nvpair.value},
      }),
      {},
    ),
    utilization: apiResource.utilization,
    metaAttributes: apiResource.meta_attr,
  };
};
