import type React from "react";
import {CardBody, CardTitle, Card as PfCard} from "@patternfly/react-core";

export const Card = ({
  children,
  title,
  "data-test": dataTest,
  isPlain,
}: {
  title?: React.ReactNode;
  children: React.ReactNode;
  "data-test"?: string;
  isPlain?: React.ComponentProps<typeof PfCard>["isPlain"];
}) => {
  return (
    <PfCard
      isPlain={isPlain}
      className="pf-v5-u-mb-sm pf-v5-u-mr-sm"
      {...(dataTest ? {"data-test": dataTest} : {})}
    >
      {title && <CardTitle>{title}</CardTitle>}
      <CardBody>{children}</CardBody>
    </PfCard>
  );
};
