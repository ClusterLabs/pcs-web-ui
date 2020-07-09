import {
  ApiPrimitive,
  ApiResource,
  ApiStonith,
} from "app/backend/types/clusterStatus";
import { types } from "app/store";

import * as statusSeverity from "../statusSeverity";
import { toPrimitive } from "./primitive";
import { filterPrimitive, toGroup } from "./group";
import { toClone } from "./clone";
import { toFenceDevice } from "./fenceDevice";
import { statusToSeverity } from "./statusInfoList";

const takeResourceOnNodeStatus = (
  apiResource: ApiPrimitive,
): types.cluster.ResourceOnNodeStatus[] =>
  apiResource.crm_status.map(
    (crmStatus): types.cluster.ResourceOnNodeStatus => ({
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
  resourceTree: types.cluster.ResourceTreeItem[];
  resourcesSeverity: types.cluster.StatusSeverity;
  fenceDeviceList: types.cluster.FenceDevice[];
  fenceDevicesSeverity: types.cluster.StatusSeverity;
  resourceOnNodeStatusList: types.cluster.ResourceOnNodeStatus[];
};

export const analyzeApiResources = (
  apiResourceList: ApiResource[],
): AnalyzedResources =>
  apiResourceList.reduce<AnalyzedResources>(
    (analyzed, apiResource) => {
      const maxResourcesSeverity = (): types.cluster.StatusSeverity =>
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
