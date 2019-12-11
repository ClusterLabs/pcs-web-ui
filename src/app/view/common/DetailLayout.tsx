import React from "react";
import {
  Button,
  Level,
  LevelItem,
  Stack,
  StackItem,
} from "@patternfly/react-core";
import { TimesIcon } from "@patternfly/react-icons";

const DetailLayout = ({
  caption,
  onClose,
  tabs = null,
  children,
}: React.PropsWithChildren<{
  onClose: (e: React.SyntheticEvent) => void;
  caption: JSX.Element|JSX.Element[]|string;
  tabs?: JSX.Element|JSX.Element[]|string|null;
}>) => (
  <Stack gutter="md" className="pf-u-m-md">
    <Stack gutter="md" className="pf-u-m-md">
      <StackItem>
        <Level>
          <LevelItem>
            {caption}
          </LevelItem>
          <LevelItem>
            <Button variant="plain" aria-label="Close panel" onClick={onClose}>
              <TimesIcon />
            </Button>
          </LevelItem>
        </Level>
      </StackItem>
      {tabs && (<StackItem>{tabs}</StackItem>)}
      {children}
    </Stack>
  </Stack>
);

export default DetailLayout;
