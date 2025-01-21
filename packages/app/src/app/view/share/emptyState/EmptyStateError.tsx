import type React from "react";
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Title,
} from "@patternfly/react-core";
import {ExclamationCircleIcon} from "@patternfly/react-icons";

import * as palette from "app/view/share/palette";

export const EmptyStateError = (props: {
  title: string;
  message: React.ReactNode;
  "data-test"?: string;
}) => {
  return (
    <EmptyState style={{margin: "auto"}} data-test={props["data-test"]}>
      <EmptyStateIcon icon={ExclamationCircleIcon} color={palette.ERROR} />
      <Title size="lg" headingLevel="h3">
        {props.title}
      </Title>
      <EmptyStateBody>{props.message}</EmptyStateBody>
    </EmptyState>
  );
};
