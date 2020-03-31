import React from "react";
import {
  Button,
  Level,
  LevelItem,
  Stack,
  StackItem,
} from "@patternfly/react-core";
import { TimesIcon } from "@patternfly/react-icons";

import { DetailComponentProps } from "app/view/common/clusterGroupDetail";

export const NodeDetailPage = ({
  detailUrlName,
  onClose,
}: DetailComponentProps) => {
  return (
    <Stack gutter="md" className="pf-u-p-md">
      <StackItem>
        <Level>
          <LevelItem>
            {detailUrlName}
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
