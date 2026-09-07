import {Link, location} from "app/view/share";

export const ResourceLink = ({
  resourceIdMixed,
}: {
  resourceIdMixed: string | string[];
}) => {
  if (Array.isArray(resourceIdMixed)) {
    return (
      <Link
        isInline
        to={location.resource({
          resourceId: resourceIdMixed[resourceIdMixed.length - 1],
        })}
      >
        {resourceIdMixed.join("/")}
      </Link>
    );
  }
  return (
    <Link isInline to={location.resource({resourceId: resourceIdMixed})} />
  );
};
