import {Link} from "app/view/share";

export const ResourceTreeCellName = ({resourceId}: {resourceId: string}) => {
  return (
    <Link strong data-test="resource-tree-item-name" to={`/${resourceId}`}>
      {resourceId}
    </Link>
  );
};
