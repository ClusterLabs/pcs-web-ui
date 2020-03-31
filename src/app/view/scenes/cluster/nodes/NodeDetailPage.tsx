import React from "react";
import {
  Button,
  Level,
  LevelItem,
  Stack,
  StackItem,
} from "@patternfly/react-core";
import { TimesIcon } from "@patternfly/react-icons";

export const NodeDetailPage = ({ caption, onClose }: {
  caption: JSX.Element|JSX.Element[]|string;
  onClose: (e: React.SyntheticEvent) => void;
}) => {
  return (
    <Stack gutter="md" className="pf-u-p-md">
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
    </Stack>
  );
};
