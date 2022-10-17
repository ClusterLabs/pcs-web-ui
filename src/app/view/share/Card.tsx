import React from "react";
import { CardBody, CardTitle, Card as PfCard } from "@patternfly/react-core";

export const Card = ({
  children,
  title,
  "data-test": dataTest,
}: {
  title?: React.ReactNode;
  children: React.ReactNode;
  ["data-test"]?: string;
}) => {
  return (
    <PfCard
      className="pf-u-mb-sm pf-u-mr-sm"
      {...(dataTest ? { "data-test": dataTest } : {})}
    >
      {title && <CardTitle>{title}</CardTitle>}
      <CardBody>{children}</CardBody>
    </PfCard>
  );
};
