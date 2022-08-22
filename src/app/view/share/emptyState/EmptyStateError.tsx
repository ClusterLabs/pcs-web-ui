import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Title,
} from "@patternfly/react-core";
import { ExclamationCircleIcon } from "@patternfly/react-icons";

import * as pallete from "app/view/share/pallete";

export const EmptyStateError = ({
  title,
  message,
}: {
  title: string;
  message: string;
}) => {
  return (
    <EmptyState style={{ margin: "auto" }}>
      <EmptyStateIcon icon={ExclamationCircleIcon} color={pallete.ERROR} />
      <Title size="lg" headingLevel="h3">
        {title}
      </Title>
      <EmptyStateBody>{message}</EmptyStateBody>
    </EmptyState>
  );
};
