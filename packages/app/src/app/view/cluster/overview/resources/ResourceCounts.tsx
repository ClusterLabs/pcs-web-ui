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
      <strong>{total.length}</strong> {description}
      {clone.length === 0 ? (
        ""
      ) : (
        <>
          , including <strong>{clone.length}</strong> in clone
        </>
      )}
      .
    </div>
  );
};
