import React from "react";
import { CardBody, CardTitle, Card as PfCard } from "@patternfly/react-core";

export const Card = ({
  children,
  title,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <PfCard className="pf-u-mb-sm pf-u-mr-sm">
      <CardTitle>{title}</CardTitle>
      <CardBody>{children}</CardBody>
    </PfCard>
  );
};
