import React from "react";
import {
  Level,
  LevelItem,
  Stack,
  StackItem,
} from "@patternfly/react-core";

import ResourceDetailClose from "./ResourceDetailClose";

const ResourceDetailLayout = ({
  caption,
  onClose,
  tabs = null,
  children,
}: React.PropsWithChildren<{
  onClose: React.ComponentProps<typeof ResourceDetailClose>["onClose"],
  caption: JSX.Element|JSX.Element[]|string;
  tabs?: JSX.Element|JSX.Element[]|string|null;
}>) => (
  <Stack gutter="md" className="pf-u-m-md">
    <StackItem>
      <Level>
        <LevelItem>
          {caption}
        </LevelItem>
        <LevelItem>
          <ResourceDetailClose onClose={onClose} />
        </LevelItem>
      </Level>
    </StackItem>
    {tabs && (<StackItem>{tabs}</StackItem>)}
    <StackItem>
      {children}
    </StackItem>
  </Stack>
);

export default ResourceDetailLayout;
