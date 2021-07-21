import * as t from "io-ts";

import { endpoint } from "./endpoint";

const shape = t.type({
  permission_types: t.array(
    t.type({
      code: t.string,
      description: t.string,
      label: t.string,
    }),
  ),
  permissions_dependencies: t.type({
    also_allows: t.record(t.string, t.array(t.string)),
  }),
  user_types: t.array(
    t.type({
      code: t.string,
      description: t.string,
      label: t.string,
    }),
  ),
  users_permissions: t.array(
    t.type({
      name: t.string,
      type: t.string,
      allow: t.array(t.string),
    }),
  ),
});

const validate = (payload: t.TypeOf<typeof shape>) => {
  const permissionCodes = payload.permission_types.map(pt => pt.code);

  return [
    ...Object.keys(payload.permissions_dependencies.also_allows).reduce<
      string[]
    >(
      (errors, key) => [
        ...errors,
        ...(permissionCodes.includes(key)
          ? []
          : [
              `Permission dependency key "${key}"`
                + ` is not in types: ${permissionCodes.join(", ")}`,
            ]),
      ],
      [],
    ),
    // TODO add more validations
  ];
};

export const getPermissions = endpoint({
  url: ({ clusterName }: { clusterName: string }) =>
    `/managec/${clusterName}/get_permissions`,
  method: "get",
  params: undefined,
  payload: undefined,
  validate,
  shape,
});
