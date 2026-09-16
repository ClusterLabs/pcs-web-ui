import {Link, location} from "app/view/share";

export const ConstraintLink = ({
  id,
  type,
}: {
  type: "resource" | "node";
  id: string;
}) => {
  return (
    <Link
      strong
      to={
        type === "resource"
          ? location.resource({resourceId: id})
          : location.node({nodeName: id})
      }
    />
  );
};
