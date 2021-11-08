import * as t from "io-ts";

import { endpoint } from "./endpoint";

// cluster_name: zoo
// permissions[0][name]: haclient
// permissions[0][type]: group
// permissions[0][allow][write]: 1
// permissions[0][allow][grant]: 1
// permissions[1][name]: user1
// permissions[1][type]: user
// permissions[1][allow][read]: 1
// permissions_new[name]:
// permissions_new[type]: user
/*
const params = {
  cluster_name: "zoo",
  permissions: [
    {
      name: "haclient",
      type: "group",
      allow: {
        write: true,
        grant: true,
      },
    },
    {
      name: "user1",
      type: "user",
      allow: {
        read: true,
      },
    },
  ],
};
*/

const params = t.type({
  cluster_name: t.string,
  permissions: t.array(
    t.type({
      name: t.string,
      type: t.string,
      allow: t.array(t.string),
    }),
  ),
});

/*
const postData = [];
postData.push(["cluster_name", params.cluster_name]);
params.permissions.forEach((item, i) => {
  postData.push([`permissions[${i}][name]`, item.name]);
  postData.push([`permissions[${i}][type]`, item.type]);
  ["read", "write", "grant"].forEach((perm) => {
    if (perm in item.allow) {
      postData.push([
        `permissions[${i}][allow][${perm}]`,
        item.allow[perm] ? "1" : "0",
      ]);
    }
  });
});
*/

// rename to permissionsSave
export const permissions = endpoint({
  url: ({ clusterName }: { clusterName: string }) =>
    `/managec/${clusterName}/permissions_save`,
  method: "post",
  params,
  shape: undefined,
  payload: undefined,
  validate: undefined,
});
