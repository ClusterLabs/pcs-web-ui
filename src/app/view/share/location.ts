export const dashboard = "/";

export const dashboardAddCluster = "/add-cluster";

export const cluster = ({ clusterName }: { clusterName: string }) =>
  `/cluster/${clusterName}`;

export const nodeList = ({ clusterName }: { clusterName: string }) =>
  `${cluster({ clusterName })}/nodes`;

export const node = ({
  clusterName,
  nodeName,
}: {
  clusterName: string;
  nodeName: string;
}) => `${nodeList({ clusterName })}/${nodeName}`;

export const resourceList = ({ clusterName }: { clusterName: string }) =>
  `${cluster({ clusterName })}/resources`;

export const resource = ({
  clusterName,
  resourceId,
}: {
  clusterName: string;
  resourceId: string;
}) => `${resourceList({ clusterName })}/${resourceId}`;

export const fenceDeviceList = ({ clusterName }: { clusterName: string }) =>
  `${cluster({ clusterName })}/fence-devices`;

export const fenceDevice = ({
  clusterName,
  fenceDeviceId,
}: {
  clusterName: string;
  fenceDeviceId: string;
}) => `${resourceList({ clusterName })}/${fenceDeviceId}`;

export const permissionList = ({ clusterName }: { clusterName: string }) =>
  `${cluster({ clusterName })}/permissions`;
