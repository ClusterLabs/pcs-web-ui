import { Link } from "app/view/share";

export const ResourceTreeCellName = ({
  resourceId,
}: {
  resourceId: string;
}) => {
  return (
    <Link to={`/${resourceId}`}>
      <strong data-test="resource-tree-item-name">{resourceId}</strong>
    </Link>
  );
};
