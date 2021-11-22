import { endpoint } from "./endpoint";

type Params = {
  permissions: {
    name: string;
    type: string;
    allow: string[];
  }[];
};

const makePostData = (
  clusterName: string,
  permissions: Params,
): [string, string][] => {
  const postData: [string, string][] = [];
  postData.push(["cluster_name", `${clusterName}`]);

  permissions.permissions.forEach((permission, i) => {
    postData.push([`permissions[${i}][name]`, permission.name]);
    postData.push([`permissions[${i}][type]`, permission.type]);
    ["read", "write", "grant"].forEach((element) => {
      postData.push([
        `permissions[${i}][allow][${element}]`,
        permission.allow.includes(element) ? "1" : "0",
      ]);
    });
  });

  return postData;
};

export const permissionsSave = endpoint({
  url: ({ clusterName }: { clusterName: string }) =>
    `/managec/${clusterName}/permissions_save`,
  method: "post",
  params: ({
    clusterName,
    permissionParams,
  }: {
    clusterName: string;
    permissionParams: Params;
  }): [string, string][] => {
    return makePostData(clusterName, permissionParams);
  },
  shape: undefined,
  payload: undefined,
  validate: undefined,
});
