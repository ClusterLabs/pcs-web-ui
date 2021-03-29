import React from "react";

import { Link, location, useSelectedClusterName } from "app/view/share";

export const ConstraintLink: React.FC<{
  type: "resource" | "node";
  id: string;
}> = ({ id, type }) => {
  const clusterName = useSelectedClusterName();
  return (
    <strong>
      <Link
        to={
          type === "resource"
            ? location.resource({ clusterName, resourceId: id })
            : location.node({ clusterName, nodeName: id })
        }
      />
    </strong>
  );
};
