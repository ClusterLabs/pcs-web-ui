import type React from "react";
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Title,
} from "@patternfly/react-core";
import {WrenchIcon} from "@patternfly/react-icons";

import * as palette from "app/view/share/palette";

export const EmptyStateConfigure = (props: {
  title: React.ReactNode;
  message: React.ReactNode;
  "data-test"?: string;
}) => {
  return (
    <EmptyState style={{margin: "auto"}} data-test={props["data-test"]}>
      <EmptyStateIcon icon={WrenchIcon} color={palette.UNKNOWN} />
      <Title size="lg" headingLevel="h3">
        {props.title}
      </Title>
      <EmptyStateBody>{props.message}</EmptyStateBody>
    </EmptyState>
  );
};
