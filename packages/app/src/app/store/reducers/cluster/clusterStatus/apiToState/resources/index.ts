import type {ActionPayload} from "app/store/actions";

import type {Cluster, StatusSeverity} from "../../types";
import * as statusSeverity from "../statusSeverity";
import {remapDeprecatedRoles} from "../remapDeprecatedRoles";

import {toPrimitive} from "./primitive";
import {filterApiPrimitive, toGroup} from "./group";
import {toClone} from "./clone";
import {toFenceDevice} from "./fenceDevice";
import {statusToSeverity} from "./statusInfoList";

type ApiCluster = ActionPayload["CLUSTER.STATUS.FETCH.OK"];
type ApiResource = ApiCluster["resource_list"][number];
type ApiPrimitiveType = {class_type: "primitive"};
type ApiPrimitive = Extract<ApiResource, ApiPrimitiveType & {stonith: false}>;
type ApiStonith = Extract<ApiResource, ApiPrimitiveType & {stonith: true}>;

const takeResourceOnNodeStatus = (
  apiResource: ApiPrimitive,
): Cluster["resourceOnNodeStatusList"] =>
  apiResource.crm_status.map(crmStatus => ({
    resource: {id: apiResource.id},
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
    targetRole: remapDeprecatedRoles(crmStatus.target_role) ?? undefined,
    role: remapDeprecatedRoles(crmStatus.role),
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
      switch (apiResource.class_type) {
        case "primitive": {
          if (apiResource.stonith) {
            const fenceDevice = toFenceDevice(apiResource as ApiStonith);
            return {
              ...analyzed,
              fenceDeviceList: [...analyzed.fenceDeviceList, fenceDevice],
              fenceDevicesSeverity: statusSeverity.max(
                analyzed.fenceDevicesSeverity,
                statusToSeverity(apiResource.status),
              ),
            };
          }
          const primitive = toPrimitive(apiResource as ApiPrimitive);
          return {
            ...analyzed,
            resourceTree: [...analyzed.resourceTree, primitive],
            resourcesSeverity: statusSeverity.max(
              analyzed.resourcesSeverity,
              primitive.status.maxSeverity,
            ),
            resourceOnNodeStatusList: [
              ...analyzed.resourceOnNodeStatusList,
              ...takeResourceOnNodeStatus(apiResource as ApiPrimitive),
            ],
          };
        }

        case "group": {
          const {apiPrimitiveList, group} = toGroup(apiResource);

          return {
            ...analyzed,
            resourceTree: [...analyzed.resourceTree, group],
            resourcesSeverity: statusSeverity.max(
              analyzed.resourcesSeverity,
              group.status.maxSeverity,
            ),
            resourceOnNodeStatusList: [
              ...analyzed.resourceOnNodeStatusList,
              ...filterApiPrimitive(apiPrimitiveList).flatMap(
                takeResourceOnNodeStatus,
              ),
            ],
          };
        }

        default: {
          if (
            apiResource.member.class_type === "group" &&
            filterApiPrimitive(apiResource.member.members).length === 0
          ) {
            // don't care about clone with group of stonith only...
            return analyzed;
          }
          const {apiPrimitiveList, clone} = toClone(apiResource);
          return {
            ...analyzed,
            resourceTree: [...analyzed.resourceTree, clone],
            resourcesSeverity: statusSeverity.max(
              analyzed.resourcesSeverity,
              clone.status.maxSeverity,
            ),
            resourceOnNodeStatusList: [
              ...analyzed.resourceOnNodeStatusList,
              ...apiPrimitiveList.flatMap(takeResourceOnNodeStatus),
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
