import { StackItem } from "@patternfly/react-core";

import { DetailLayout, EmptyStateNoItem } from "app/view/share";

export const ResourceDoesNotExists = ({
  resourceId,
}: {
  resourceId: string;
}) => {
  return (
    <DetailLayout caption={<strong>{resourceId}</strong>}>
      <StackItem>
        <EmptyStateNoItem
          title={`Resource "${resourceId}" does not exist.`}
          message={`You don't have configured resource "${resourceId}" here.`}
        />
      </StackItem>
    </DetailLayout>
  );
};
