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
import { SearchIcon } from "@patternfly/react-icons";

import { FilterGroups } from "app/view/FilterGroups";

import { pcmkAgentAttrsFiltersTypes } from "./pcmkAgentAttrsFiltersTypes";

export function PcmkAgentAttrsToolbar({
  actions = {},
  filters,
}: {
  actions?: Record<string, () => void>;
  filters: pcmkAgentAttrsFiltersTypes;
}) {
  const clearAllFilters = () =>
    filters.importances.set(
      FilterGroups.unselectAllOptions(filters.importances.values),
    );

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
              onChange={filters.nameSearch.set}
              value={filters.nameSearch.value}
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
            options={filters.importances.values}
            setSelected={filters.importances.set}
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
