import { endpoint } from "./endpoint";

type Permission = {
  name: string;
  type: string;
  allow: ("read" | "write" | "grant" | "full")[];
};

const makePostData = (
  clusterName: string,
  permissionList: Permission[],
): [string, string][] => {
  const postData: [string, string][] = [];
  postData.push(["cluster_name", `${clusterName}`]);

  permissionList.forEach((permission, i) => {
    postData.push([`permissions[${i}][name]`, permission.name]);
    postData.push([`permissions[${i}][type]`, permission.type]);
    (["read", "write", "grant", "full"] as Permission["allow"]).forEach(
      permissionName => {
        postData.push([
          `permissions[${i}][allow][${permissionName}]`,
          permission.allow.includes(permissionName) ? "1" : "0",
        ]);
      },
    );
  });

  return postData;
};

export const permissionsSave = endpoint({
  url: ({ clusterName }: { clusterName: string }) =>
    `/managec/${clusterName}/permissions_save`,
  method: "post",
  params: ({
    clusterName,
    permissionList,
  }: {
    clusterName: string;
    permissionList: Permission[];
  }): [string, string][] => {
    return makePostData(clusterName, permissionList);
  },
  shape: undefined,
  payload: undefined,
  validate: undefined,
});
