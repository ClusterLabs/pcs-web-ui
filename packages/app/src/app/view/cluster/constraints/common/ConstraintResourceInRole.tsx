export const ConstraintResourceInRole = ({
  role,
}: {
  role: string | undefined;
}) => {
  return (
    <>
      {" in role "}
      <strong>{role || "Started"}</strong>
    </>
  );
};
