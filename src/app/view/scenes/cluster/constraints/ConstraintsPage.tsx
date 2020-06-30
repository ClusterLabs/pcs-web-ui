import React from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardBody,
  PageSection,
  Stack,
  StackItem,
} from "@patternfly/react-core";

import { selectors } from "app/store";

import { ConstraintsEmpty } from "./ConstraintsEmpty";
import { ConstraintList } from "./ConstraintList";

export const ConstraintsPage = ({
  clusterUrlName,
}: {
  clusterUrlName: string;
}) => {
  const constraintPacks = useSelector(selectors.getConstraints(clusterUrlName));
  return (
    <PageSection>
      <Card>
        <CardBody>
          <Stack hasGutter>
            {constraintPacks.length === 0 && (
              <StackItem>
                <ConstraintsEmpty />
              </StackItem>
            )}
            {constraintPacks.length !== 0 && (
              <ConstraintList constraintPacks={constraintPacks} />
            )}
          </Stack>
        </CardBody>
      </Card>
    </PageSection>
  );
};
