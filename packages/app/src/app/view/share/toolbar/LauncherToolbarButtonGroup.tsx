import {Button, ToolbarGroup, ToolbarItem} from "@patternfly/react-core";

import {tools} from "app/store";

import {LauncherGroup} from "./LauncherGroup";
import {Launcher} from "./Launcher";
import {LauncherItem} from "./types";

export const LauncherToolbarButtonGroup = ({
  items = [],
}: {
  items: LauncherItem[];
}) => {
  return (
    <LauncherGroup items={items}>
      <ToolbarGroup variant="button-group">
        {items.map((item, i) => (
          <ToolbarItem key={i}>
            <Launcher item={item}>
              {launch => (
                <Button
                  variant={item.button?.variant ?? "secondary"}
                  onClick={launch}
                  data-test={item["data-test"]}
                  isDisabled={item.disabled ?? false}
                >
                  {tools.labelize(item.label || item.name)}
                </Button>
              )}
            </Launcher>
          </ToolbarItem>
        ))}
      </ToolbarGroup>
    </LauncherGroup>
  );
};
