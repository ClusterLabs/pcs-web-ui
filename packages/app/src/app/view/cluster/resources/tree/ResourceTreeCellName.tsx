import {Link} from "app/view/share";

export const ResourceTreeCellName = (props: {
  resourceId: string;
  "data-test"?: string;
}) => {
  return (
    <Link
      strong
      isInline
      data-test={props["data-test"]}
      to={`/${props.resourceId}`}
    >
      {props.resourceId}
    </Link>
  );
};
