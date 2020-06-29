export const cluster = {
  nodes: (clusterName: string, nodeName: string) =>
    `/cluster/${clusterName}/nodes/${nodeName}`,

  resources: (clusterName: string, resourceId: string) =>
    `/cluster/${clusterName}/resources/${resourceId}`,

  fenceDeices: (clusterName: string, fenceDeviceId: string) =>
    `/cluster/${clusterName}/fence-devices/${fenceDeviceId}`,

  detail: (clusterName: string) => `/cluster/${clusterName}`,
};
