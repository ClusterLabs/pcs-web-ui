import { Button, ToolbarGroup, ToolbarItem } from "@patternfly/react-core";

import { LauncherGroup } from "./LauncherGroup";
import { Launcher } from "./Launcher";
import { labelize } from "./tools";
import { LauncherItem } from "./types";

export const LauncherToolbarButtonGroup = <ARGS extends unknown[] = []>({
  items = [],
  toolbarName,
}: {
  items: LauncherItem<ARGS>[];
  toolbarName: string;
}) => {
  return (
    <LauncherGroup items={items} toolbarName={toolbarName}>
      {setLaunched => (
        <ToolbarGroup variant="button-group">
          {items.map((item, i) => (
            <ToolbarItem key={i}>
              <Launcher item={item} setLaunched={setLaunched}>
                {launch => (
                  <Button
                    variant="secondary"
                    onClick={launch}
                    data-test={`toolbar-${toolbarName}-${item.name}`}
                  >
                    {labelize(item.label || item.name)}
                  </Button>
                )}
              </Launcher>
            </ToolbarItem>
          ))}
        </ToolbarGroup>
      )}
    </LauncherGroup>
  );
};
