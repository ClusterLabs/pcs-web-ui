import {remapDeprecatedRoles} from "app/store";

export const ConstraintResourceInRole = ({
  role,
}: {
  role: string | undefined;
}) => {
  return (
    <>
      {" in role "}
      <strong>{remapDeprecatedRoles(role) || "Started"}</strong>
    </>
  );
};
