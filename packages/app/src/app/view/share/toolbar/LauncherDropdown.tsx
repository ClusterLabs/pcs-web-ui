import React from "react";
import {
  Dropdown,
  DropdownItem,
  KebabToggle,
} from "@patternfly/react-core/deprecated";

import {tools} from "app/store";

import {LauncherGroup} from "./LauncherGroup";
import {Launcher} from "./Launcher";
import {LauncherItem} from "./types";

export const LauncherDropdown = (props: {
  items: LauncherItem[];
  "data-test"?: string;
}) => {
  const [kebabOpen, setKebabOpen] = React.useState(false);

  return (
    <LauncherGroup items={props.items}>
      <Dropdown
        data-test={props["data-test"]}
        toggle={<KebabToggle onToggle={() => setKebabOpen(!kebabOpen)} />}
        onSelect={() => setKebabOpen(false)}
        isOpen={kebabOpen}
        isPlain
        dropdownItems={props.items.map((item, i) => (
          <Launcher key={i} item={item}>
            {launch => (
              <DropdownItem
                component="button"
                onClick={launch}
                data-test={"data-test" in item ? item["data-test"] : item.name}
                isDisabled={item.disabled ?? false}
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
