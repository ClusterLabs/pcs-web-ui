import { ActionPayload } from "app/store/actions";

import { Cluster, StatusSeverity } from "../../types";
import * as statusSeverity from "../statusSeverity";

import { toPrimitive } from "./primitive";
import { filterApiPrimitive, toGroup } from "./group";
import { toClone } from "./clone";
import { toFenceDevice } from "./fenceDevice";
import { statusToSeverity } from "./statusInfoList";

type ApiCluster = ActionPayload["CLUSTER.STATUS.FETCH.OK"];
type ApiResource = ApiCluster["resource_list"][number];
type ApiPrimitiveType = { class_type: "primitive" };
type ApiPrimitive = Extract<ApiResource, ApiPrimitiveType & { stonith: false }>;
type ApiStonith = Extract<ApiResource, ApiPrimitiveType & { stonith: true }>;

const takeResourceOnNodeStatus = (
  apiResource: ApiPrimitive,
): Cluster["resourceOnNodeStatusList"] =>
  apiResource.crm_status.map(crmStatus => ({
    resource: { id: apiResource.id },
    node:
      crmStatus.node === null
        ? null
        : {
            name: crmStatus.node.name,
          },
    active: crmStatus.active,
    failed: crmStatus.failed,
    failureIgnored: crmStatus.failure_ignored,
    managed: crmStatus.managed,
    targetRole: crmStatus.target_role ?? undefined,
    role: crmStatus.role,
    pending: crmStatus.pending,
    orphaned: crmStatus.orphaned,
    nodesRunningOn: crmStatus.nodes_running_on,
    blocked: crmStatus.blocked === true,
  }));

type AnalyzedResources = {
  resourceTree: Cluster["resourceTree"];
  resourcesSeverity: StatusSeverity;
  fenceDeviceList: Cluster["fenceDeviceList"];
  fenceDevicesSeverity: StatusSeverity;
  resourceOnNodeStatusList: Cluster["resourceOnNodeStatusList"];
};

export const analyzeApiResources = (
  apiResourceList: ApiResource[],
): AnalyzedResources =>
  apiResourceList.reduce<AnalyzedResources>(
    (analyzed, apiResource) => {
      const maxResourcesSeverity = (): StatusSeverity =>
        statusSeverity.max(
          analyzed.resourcesSeverity,
          statusToSeverity(apiResource.status),
        );
      switch (apiResource.class_type) {
        case "primitive":
          if (apiResource.stonith) {
            return {
              ...analyzed,
              fenceDeviceList: [
                ...analyzed.fenceDeviceList,
                toFenceDevice(apiResource as ApiStonith),
              ],
              fenceDevicesSeverity: statusSeverity.max(
                analyzed.fenceDevicesSeverity,
                statusToSeverity(apiResource.status),
              ),
            };
          }
          return {
            ...analyzed,
            resourceTree: [
              ...analyzed.resourceTree,
              toPrimitive(apiResource as ApiPrimitive),
            ],
            resourcesSeverity: maxResourcesSeverity(),
            resourceOnNodeStatusList: [
              ...analyzed.resourceOnNodeStatusList,
              ...takeResourceOnNodeStatus(apiResource as ApiPrimitive),
            ],
          };

        case "group": {
          const { apiPrimitiveList, group } = toGroup(apiResource);

          return {
            ...analyzed,
            resourceTree: [...analyzed.resourceTree, group],
            resourcesSeverity: maxResourcesSeverity(),
            resourceOnNodeStatusList: [
              ...analyzed.resourceOnNodeStatusList,
              ...filterApiPrimitive(apiPrimitiveList)
                .map(takeResourceOnNodeStatus)
                .flat(),
            ],
          };
        }

        case "clone":
        default: {
          if (
            apiResource.member.class_type === "group"
            && filterApiPrimitive(apiResource.member.members).length === 0
          ) {
            // don't care about clone with group of stonith only...
            return analyzed;
          }
          const { apiPrimitiveList, clone } = toClone(apiResource);
          return {
            ...analyzed,
            resourceTree: [...analyzed.resourceTree, clone],
            resourcesSeverity: maxResourcesSeverity(),
            resourceOnNodeStatusList: [
              ...analyzed.resourceOnNodeStatusList,
              ...apiPrimitiveList.map(takeResourceOnNodeStatus).flat(),
            ],
          };
        }
      }
    },
    {
      resourceTree: [],
      resourcesSeverity: "OK",
      fenceDeviceList: [],
      fenceDevicesSeverity: "OK",
      resourceOnNodeStatusList: [],
    },
  );
