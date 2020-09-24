import { lib } from "app/backend/tools";

export const resourceManage = async ({
  clusterUrlName,
  resourceNameList,
}: {
  clusterUrlName: string;
  resourceNameList: string[];
}) =>
  lib.callCluster({
    clusterUrlName,
    commandUrlName: "resource-manage",
    payload: { resource_or_tag_ids: resourceNameList },
  });

export const resourceUnmanage = async ({
  clusterUrlName,
  resourceNameList,
}: {
  clusterUrlName: string;
  resourceNameList: string[];
}) =>
  lib.callCluster({
    clusterUrlName,
    commandUrlName: "resource-unmanage",
    payload: { resource_or_tag_ids: resourceNameList },
  });

export const resourceDisable = async ({
  clusterUrlName,
  resourceNameList,
}: {
  clusterUrlName: string;
  resourceNameList: string[];
}) =>
  lib.callCluster({
    clusterUrlName,
    commandUrlName: "resource-disable",
    payload: { resource_or_tag_ids: resourceNameList },
  });

export const resourceEnable = async ({
  clusterUrlName,
  resourceNameList,
}: {
  clusterUrlName: string;
  resourceNameList: string[];
}) =>
  lib.callCluster({
    clusterUrlName,
    commandUrlName: "resource-enable",
    payload: { resource_or_tag_ids: resourceNameList },
  });
