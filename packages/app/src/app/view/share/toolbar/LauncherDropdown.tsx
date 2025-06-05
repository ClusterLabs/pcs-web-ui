import React from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownList,
  MenuToggle,
} from "@patternfly/react-core";
import EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon";

import {tools} from "app/store";

import {LauncherGroup} from "./LauncherGroup";
import {Launcher} from "./Launcher";
import type {LauncherItem} from "./types";

export const LauncherDropdown = (props: {
  items: LauncherItem[];
  "data-test"?: string;
}) => {
  const [kebabOpen, setKebabOpen] = React.useState(false);

  return (
    <LauncherGroup items={props.items}>
      <Dropdown
        toggle={toggleRef => (
          <MenuToggle
            ref={toggleRef}
            variant="plain"
            onClick={() => setKebabOpen(!kebabOpen)}
            isExpanded={kebabOpen}
            data-test={props["data-test"]}
          >
            <EllipsisVIcon />
          </MenuToggle>
        )}
        onSelect={(_event, _value) => setKebabOpen(false)}
        isOpen={kebabOpen}
        onOpenChange={isOpen => setKebabOpen(isOpen)}
        shouldFocusToggleOnSelect
      >
        <DropdownList>
          {props.items.map((item, i) => (
            <Launcher key={i} item={item}>
              {launch => (
                <DropdownItem
                  value={item.name}
                  onClick={launch}
                  {...("data-test" in item
                    ? {"data-test": item["data-test"]}
                    : {})}
                  isDisabled={item.disabled ?? false}
                >
                  {tools.labelize(item.label || item.name)}
                </DropdownItem>
              )}
            </Launcher>
          ))}
        </DropdownList>
      </Dropdown>
    </LauncherGroup>
  );
};
