const root = "~/ui";
export const dashboard = root;

export const cluster = ({clusterName}: {clusterName: string}) =>
  `${root}/cluster/${clusterName}`;

export const nodeList = ({clusterName}: {clusterName: string}) =>
  `${cluster({clusterName})}/nodes`;

export const node = ({
  clusterName,
  nodeName,
}: {
  clusterName: string;
  nodeName: string;
}) => `${nodeList({clusterName})}/${nodeName}`;

export const resourceList = ({clusterName}: {clusterName: string}) =>
  `${cluster({clusterName})}/resources`;

export const resource = ({
  clusterName,
  resourceId,
}: {
  clusterName: string;
  resourceId: string;
}) => `${resourceList({clusterName})}/${resourceId}`;

export const fenceDeviceList = ({clusterName}: {clusterName: string}) =>
  `${cluster({clusterName})}/fence-devices`;

export const fenceDevice = ({
  clusterName,
  fenceDeviceId,
}: {
  clusterName: string;
  fenceDeviceId: string;
}) => `${fenceDeviceList({clusterName})}/${fenceDeviceId}`;

export const sbdList = ({clusterName}: {clusterName: string}) =>
  `${cluster({clusterName})}/sbd`;

export const permissionList = ({clusterName}: {clusterName: string}) =>
  `${cluster({clusterName})}/permissions`;

export const acl = ({clusterName}: {clusterName: string}) =>
  `${cluster({clusterName})}/acl`;

export const aclGroup = ({
  clusterName,
  groupId,
}: {
  clusterName: string;
  groupId: string;
}) => `${cluster({clusterName})}/acl/group/${groupId}`;

export const aclUser = ({
  clusterName,
  userId,
}: {
  clusterName: string;
  userId: string;
}) => `${cluster({clusterName})}/acl/user/${userId}`;

export const aclRole = ({
  clusterName,
  roleId,
}: {
  clusterName: string;
  roleId: string;
}) => `${cluster({clusterName})}/acl/role/${roleId}`;
