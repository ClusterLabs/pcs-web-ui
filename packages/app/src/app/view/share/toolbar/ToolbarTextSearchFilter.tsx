import React from "react";
import {Button, ButtonVariant, InputGroup} from "@patternfly/react-core";
import {SearchIcon} from "@patternfly/react-icons";

import {TextInput} from "app/view/share/form";

const useState = (initialValue = "") => React.useState(initialValue);

const match = (name: string, nameSearch: string) =>
  name.toLowerCase().includes(nameSearch.toLowerCase());

export const ToolbarTextSearchFilter = ({
  id,
  name,
  filterState,
}: {
  name: string;
  id: string;
  filterState: ReturnType<typeof useState>;
}) => {
  const [value, onChange] = filterState;
  return (
    <InputGroup>
      <TextInput
        type="search"
        id={id}
        name={name}
        aria-label="search by attribute name"
        onChange={onChange}
        value={value}
      />
      <Button
        variant={ButtonVariant.control}
        aria-label="search button for search input"
      >
        <SearchIcon />
      </Button>
    </InputGroup>
  );
};

ToolbarTextSearchFilter.match = match;
ToolbarTextSearchFilter.useState = useState;
