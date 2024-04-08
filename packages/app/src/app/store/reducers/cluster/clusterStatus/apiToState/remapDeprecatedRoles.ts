export const remapDeprecatedRoles = <
  ROLE_NAME extends string | undefined | null,
>(
  roleName: ROLE_NAME,
) => {
  if (roleName === "Master") {
    return "Promoted";
  }
  if (roleName === "master") {
    return "promoted";
  }
  if (roleName === "Slave") {
    return "Unpromoted";
  }
  if (roleName === "slave") {
    return "unpromoted";
  }

  return roleName;
};
