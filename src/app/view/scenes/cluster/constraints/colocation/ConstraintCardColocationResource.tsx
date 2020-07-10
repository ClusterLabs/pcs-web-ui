import React from "react";
import { Card, CardBody } from "@patternfly/react-core";

import { url } from "app/store";
import { Link } from "app/view";
import { useSelectedClusterName } from "app/view/scenes/cluster";

import { ConstraintValue } from "../common";

export const ConstraintCardColocationResource = ({
  label,
  id,
  role,
  instance,
}: {
  label: string;
  id: string;
  role: string | undefined;
  instance: number | undefined;
}) => {
  const clusterName = useSelectedClusterName();
  return (
    <Card>
      <CardBody>
        <ConstraintValue label={label}>
          <Link to={url.cluster.resources(clusterName, id)} />
        </ConstraintValue>
        <ConstraintValue label="Role" value={role} />
        <ConstraintValue label="Instance" value={instance} />
      </CardBody>
    </Card>
  );
};
