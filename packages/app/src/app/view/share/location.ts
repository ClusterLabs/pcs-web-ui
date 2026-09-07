const root = "~/ui";
export const dashboard = root;

export const nodeList = () => `${root}/nodes`;

export const node = ({nodeName}: {nodeName: string}) =>
  `${nodeList()}/${nodeName}`;

export const resourceList = () => `${root}/resources`;

export const resource = ({resourceId}: {resourceId: string}) =>
  `${resourceList()}/${resourceId}`;

export const fenceDeviceList = () => `${root}/fence-devices`;

export const properties = () => `${root}/properties`;

export const fenceDevice = ({fenceDeviceId}: {fenceDeviceId: string}) =>
  `${fenceDeviceList()}/${fenceDeviceId}`;

export const sbdList = () => `${root}/sbd`;

export const permissionList = () => `${root}/permissions`;

export const acl = () => `${root}/acl`;

export const aclGroup = ({groupId}: {groupId: string}) =>
  `${acl()}/group/${groupId}`;

export const aclUser = ({userId}: {userId: string}) =>
  `${acl()}/user/${userId}`;

export const aclRole = ({roleId}: {roleId: string}) =>
  `${acl()}/role/${roleId}`;
