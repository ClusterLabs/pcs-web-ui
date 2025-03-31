import {Link, location} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";

export const ResourceLink = ({
  resourceIdMixed,
}: {
  resourceIdMixed: string | string[];
}) => {
  const {clusterName} = useLoadedCluster();

  if (Array.isArray(resourceIdMixed)) {
    return (
      <Link
        isInline
        to={location.resource({
          clusterName,
          resourceId: resourceIdMixed[resourceIdMixed.length - 1],
        })}
      >
        {resourceIdMixed.join("/")}
      </Link>
    );
  }
  return (
    <Link
      isInline
      to={location.resource({clusterName, resourceId: resourceIdMixed})}
    />
  );
};
