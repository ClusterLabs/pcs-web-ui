import {Link, location, useLoadedCluster} from "app/view/share";

export const ConstraintLink = ({
  id,
  type,
}: {
  type: "resource" | "node";
  id: string;
}) => {
  const {clusterName} = useLoadedCluster();
  return (
    <Link
      strong
      to={
        type === "resource"
          ? location.resource({clusterName, resourceId: id})
          : location.node({clusterName, nodeName: id})
      }
    />
  );
};
