import {Badge} from "@patternfly/react-core";

export const ResourceCounts = ({
  resourceIdLists,
  description,
}: {
  resourceIdLists: {
    total: string[];
    clone: string[];
  };
  description: string;
}) => {
  const {total, clone} = resourceIdLists;
  if (total.length === 0) {
    return null;
  }
  return (
    <div>
      <Badge isRead>{total.length}</Badge> {description}
      {clone.length === 0 ? (
        ""
      ) : (
        <>
          {" "}
          (<Badge isRead>{clone.length}</Badge> in clone)
        </>
      )}
      .
    </div>
  );
};
