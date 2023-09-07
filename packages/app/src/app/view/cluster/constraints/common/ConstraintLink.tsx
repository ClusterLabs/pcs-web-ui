import {Link, location} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";

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
