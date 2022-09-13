import React from "react";
import { Dropdown, DropdownItem, KebabToggle } from "@patternfly/react-core";

import { tools } from "app/store";

import { LauncherGroup } from "./LauncherGroup";
import { Launcher } from "./Launcher";
import { LauncherItem } from "./types";

export const LauncherDropdown = <ARGS extends unknown[] = []>({
  items = [],
  dropdownName,
}: {
  items: LauncherItem<ARGS>[];
  dropdownName: string;
}) => {
  const [kebabOpen, setKebabOpen] = React.useState(false);

  return (
    <LauncherGroup items={items} toolbarName={dropdownName}>
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
                  data-test={`dropdown-${dropdownName}-${item.name}`}
                  isDisabled={item?.disabled ?? false}
                >
                  {tools.labelize(item.label || item.name)}
                </DropdownItem>
              )}
            </Launcher>
          ))}
        />
      )}
    </LauncherGroup>
  );
};
