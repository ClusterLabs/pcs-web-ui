import { api } from "app/backend";

import {
  FenceDevice,
  ResourceOnNodeStatus,
  ResourceTreeItem,
  StatusSeverity,
} from "../../types";
import * as statusSeverity from "../statusSeverity";

import { toPrimitive } from "./primitive";
import { filterPrimitive, toGroup } from "./group";
import { toClone } from "./clone";
import { toFenceDevice } from "./fenceDevice";
import { statusToSeverity } from "./statusInfoList";

type ApiPrimitive = api.clusterStatus.Primitive;
type ApiStonith = api.clusterStatus.Stonith;

const takeResourceOnNodeStatus = (
  apiResource: ApiPrimitive,
): ResourceOnNodeStatus[] =>
  apiResource.crm_status.map(
    (crmStatus): ResourceOnNodeStatus => ({
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
    }),
  );

type AnalyzedResources = {
  resourceTree: ResourceTreeItem[];
  resourcesSeverity: StatusSeverity;
  fenceDeviceList: FenceDevice[];
  fenceDevicesSeverity: StatusSeverity;
  resourceOnNodeStatusList: ResourceOnNodeStatus[];
};

export const analyzeApiResources = (
  apiResourceList: api.clusterStatus.Resource[],
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
          if (apiResource.class === "stonith") {
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
          if (filterPrimitive(apiResource.members).length === 0) {
            // don't care about group of stonith only...
            return analyzed;
          }
          const { apiPrimitiveList, group } = toGroup(apiResource);

          return {
            ...analyzed,
            resourceTree: [...analyzed.resourceTree, group],
            resourcesSeverity: maxResourcesSeverity(),
            resourceOnNodeStatusList: [
              ...analyzed.resourceOnNodeStatusList,
              ...apiPrimitiveList.map(takeResourceOnNodeStatus).flat(),
            ],
          };
        }

        case "clone":
        default: {
          if (
            apiResource.member.class_type === "group"
            && filterPrimitive(apiResource.member.members).length === 0
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
