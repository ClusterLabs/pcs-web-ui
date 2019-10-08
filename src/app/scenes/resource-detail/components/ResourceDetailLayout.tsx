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
  closeUrl,
  tabs = null,
  children,
}: React.PropsWithChildren<{
  caption: JSX.Element|JSX.Element[]|string;
  tabs?: JSX.Element|JSX.Element[]|string|null;
  closeUrl: string;
}>) => (
  <Stack gutter="md" className="pf-u-m-md">
    <StackItem>
      <Level>
        <LevelItem>
          {caption}
        </LevelItem>
        <LevelItem>
          <ResourceDetailClose closeUrl={closeUrl} />
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
