import { Link, location, useSelectedClusterName } from "app/view/share";

export const ConstraintLink = ({
  id,
  type,
}: {
  type: "resource" | "node";
  id: string;
}) => {
  const clusterName = useSelectedClusterName();
  return (
    <strong>
      <Link
        to={
          type === "resource"
            ? location.resource({ clusterName, resourceId: id })
            : location.node({ clusterName, nodeName: id })
        }
      />
    </strong>
  );
};
