import {Link, location, useDispatch, useLoadedCluster} from "app/view/share";

export const ResourceLink = ({
  resourceIdMixed,
}: {
  resourceIdMixed: string | string[];
}) => {
  const dispatch = useDispatch();
  const {clusterName} = useLoadedCluster();

  if (Array.isArray(resourceIdMixed)) {
    return (
      <Link
        isInline
        onClick={navigate => {
          dispatch({
            type: "RESOURCE.TREE.ITEM.OPEN.EXCLUSIVE",
            key: {clusterName},
            payload: {
              itemIdList: resourceIdMixed.slice(0, resourceIdMixed.length),
            },
          });
          navigate(
            location.resource({
              clusterName,
              resourceId: resourceIdMixed[resourceIdMixed.length - 1],
            }),
          );
        }}
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
