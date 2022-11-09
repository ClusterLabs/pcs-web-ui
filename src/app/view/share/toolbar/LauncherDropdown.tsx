import React from "react";
import {Dropdown, DropdownItem, KebabToggle} from "@patternfly/react-core";

import {tools} from "app/store";

import {LauncherGroup} from "./LauncherGroup";
import {Launcher} from "./Launcher";
import {LauncherItem} from "./types";

export const LauncherDropdown = ({
  items = [],
  dropdownName,
}: {
  items: LauncherItem[];
  dropdownName: string;
}) => {
  const [kebabOpen, setKebabOpen] = React.useState(false);

  return (
    <LauncherGroup items={items}>
      <Dropdown
        toggle={<KebabToggle onToggle={() => setKebabOpen(!kebabOpen)} />}
        onSelect={() => setKebabOpen(false)}
        isOpen={kebabOpen}
        isPlain
        dropdownItems={items.map((item, i) => (
          <Launcher key={i} item={item}>
            {launch => (
              <DropdownItem
                component="button"
                onClick={launch}
                data-test={`${dropdownName}-${item.name}`}
                isDisabled={item?.disabled ?? false}
              >
                {tools.labelize(item.label || item.name)}
              </DropdownItem>
            )}
          </Launcher>
        ))}
      />
    </LauncherGroup>
  );
};
