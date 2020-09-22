import { CallLibResult, callLib } from "./lib";

export const resourceManage: CallLibResult = async ({
  clusterUrlName,
  resourceNameList,
}: {
  clusterUrlName: string;
  resourceNameList: string[];
}) => {
  return callLib({
    clusterUrlName,
    urlName: "resource-manage",
    payload: {
      resource_or_tag_ids: resourceNameList,
    },
  });
};

export const resourceUnmanage: CallLibResult = async ({
  clusterUrlName,
  resourceNameList,
}: {
  clusterUrlName: string;
  resourceNameList: string[];
}) => {
  return callLib({
    clusterUrlName,
    urlName: "resource-unmanage",
    payload: {
      resource_or_tag_ids: resourceNameList,
    },
  });
};

export const resourceDisable: CallLibResult = async ({
  clusterUrlName,
  resourceNameList,
}: {
  clusterUrlName: string;
  resourceNameList: string[];
}) => {
  return callLib({
    clusterUrlName,
    urlName: "resource-disable",
    payload: {
      resource_or_tag_ids: resourceNameList,
    },
  });
};

export const resourceEnable: CallLibResult = async ({
  clusterUrlName,
  resourceNameList,
}: {
  clusterUrlName: string;
  resourceNameList: string[];
}) => {
  return callLib({
    clusterUrlName,
    urlName: "resource-enable",
    payload: {
      resource_or_tag_ids: resourceNameList,
    },
  });
};
