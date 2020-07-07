import React from "react";
import {
  Button,
  ButtonVariant,
  InputGroup,
  TextInput,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";

import { FilterGroups } from "app/view/common";
import { SearchIcon } from "@patternfly/react-icons";

export function PcmkAgentAttrsToolbar<T extends Record<string, boolean>>({
  actions = {},
  attributeNameSearch,
  setAttributeNameSearch,
  importances,
  setImportances,
}: {
  actions?: Record<string, () => void>;
  attributeNameSearch: string;
  setAttributeNameSearch: (attributeNameSearch: string) => void;
  importances: T;
  setImportances: (i: T) => void;
}) {
  const clearAllFilters = () =>
    setImportances(FilterGroups.unselectAllOptions(importances));

  return (
    <Toolbar
      className="pf-m-toggle-group-container"
      clearAllFilters={clearAllFilters}
    >
      <ToolbarContent>
        <ToolbarItem>
          <InputGroup>
            <TextInput
              name="agent-attributes-name"
              id="agent-attributes-name"
              type="search"
              aria-label="search by attribute name"
              onChange={(value: string) => setAttributeNameSearch(value)}
              value={attributeNameSearch}
            />
            <Button
              variant={ButtonVariant.control}
              aria-label="search button for search input"
            >
              <SearchIcon />
            </Button>
          </InputGroup>
        </ToolbarItem>
        <ToolbarGroup variant="filter-group">
          <FilterGroups
            name="Importance"
            options={importances}
            setSelected={setImportances}
          />
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarItem>
            {Object.keys(actions).map(label => (
              <Button key={label} onClick={actions[label]}>
                {label}
              </Button>
            ))}
          </ToolbarItem>
        </ToolbarGroup>
      </ToolbarContent>
    </Toolbar>
  );
}
