export const clusterDetail = (clusterUrlName: string) => (
  `/cluster/${clusterUrlName}`
);
export const clusterNodes = (clusterUrlName: string) => (
  `/cluster/${clusterUrlName}/nodes`
);
export const clusterResources = (clusterUrlName: string) => (
  `/cluster/${clusterUrlName}/resources`
);
export const clusterFenceDevices = (clusterUrlName: string) => (
  `/cluster/${clusterUrlName}/fence-devices`
);

export const resourcesDetail = (
  clusterUrlName: string,
  resourceUrlName: string,
) => `/cluster/${clusterUrlName}/resources/${resourceUrlName}`;

export const resourcesAttributes = (
  clusterUrlName: string,
  resourceUrlName: string,
) => `/cluster/${clusterUrlName}/resources/${resourceUrlName}/attributes`;
