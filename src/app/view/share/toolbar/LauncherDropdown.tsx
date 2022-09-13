import React from "react";
import { Dropdown, DropdownItem, KebabToggle } from "@patternfly/react-core";

import { LauncherGroup } from "./LauncherGroup";
import { Launcher } from "./Launcher";
import { labelize } from "./tools";
import { LauncherItem } from "./types";

export const LauncherDropdown = <ARGS extends unknown[] = []>({
  items = [],
  toolbarName,
}: {
  items: LauncherItem<ARGS>[];
  toolbarName: string;
}) => {
  const [kebabOpen, setKebabOpen] = React.useState(false);

  return (
    <LauncherGroup items={items} toolbarName={toolbarName}>
      {setLaunched => (
        <Dropdown
          toggle={<KebabToggle onToggle={() => setKebabOpen(!kebabOpen)} />}
          onSelect={() => setKebabOpen(false)}
          isOpen={kebabOpen}
          isPlain
          dropdownItems={items.map((item, i) => (
            <Launcher key={i} item={item} setLaunched={setLaunched}>
              {launch => (
                <DropdownItem
                  component="button"
                  onClick={launch}
                  data-test={`toolbar-${toolbarName}-${item.name}`}
                  isDisabled={item?.disabled ?? false}
                >
                  {labelize(item.label || item.name)}
                </DropdownItem>
              )}
            </Launcher>
          ))}
        />
      )}
    </LauncherGroup>
  );
};
