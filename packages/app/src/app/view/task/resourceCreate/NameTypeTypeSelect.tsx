import React from "react";
import {useSelector} from "react-redux";
import {
  Button,
  Flex,
  FlexItem,
  type FlexProps,
  MenuToggle,
  Select,
  SelectGroup,
  SelectOption,
  Spinner,
  TextInputGroup,
  TextInputGroupMain,
  TextInputGroupUtilities,
} from "@patternfly/react-core";
import TimesIcon from "@patternfly/react-icons/dist/esm/icons/times-icon";

import {selectors} from "app/store";
// import {useSelectControll} from "app/view/share";
import {testMarks} from "app/view/dataTest";

import {useTask} from "./useTask";

type ResourceAgentMap = NonNullable<
  ReturnType<ReturnType<typeof selectors.getResourceAgentMap>>
>;

type EnhancedAgentMap = Record<
  string,
  {
    agentName: string;
    fullAgentName: string;
    globalIndex: number;
  }[]
>;
const grow: FlexProps["grow"] = {default: "grow"};

const findByIndex = (resourceAgentMap: EnhancedAgentMap, index: number) => {
  for (const group of Object.keys(resourceAgentMap)) {
    for (
      let localIndex = 0;
      localIndex < resourceAgentMap[group].length;
      localIndex++
    ) {
      if (resourceAgentMap[group][localIndex].globalIndex === index) {
        return resourceAgentMap[group][localIndex];
      }
    }
  }
  return null;
};

const enhanceAgentMap = (agentMap: ResourceAgentMap): EnhancedAgentMap => {
  const enhancedAgentMap: EnhancedAgentMap = {};
  let globalIndex = 0;

  Object.entries(agentMap).forEach(([group, agentList]) => {
    enhancedAgentMap[group] = [];
    agentList.forEach(agentName => {
      enhancedAgentMap[group].push({
        agentName,
        fullAgentName: `${group}:${agentName}`,
        globalIndex,
      });
      globalIndex++;
    });
  });

  return enhancedAgentMap;
};

const filterSources = (
  search: string,
  sources: ResourceAgentMap,
): ResourceAgentMap => {
  if (search === "") {
    return sources;
  }
  return Object.keys(sources).reduce((filteredSources, group) => {
    const items = sources[group].filter(i =>
      i.toLowerCase().includes(search.toLowerCase()),
    );
    return items.length > 0
      ? {...filteredSources, [group]: items}
      : filteredSources;
  }, {});
};

const mkId = (suffix = "") => `resource-type-${suffix}`;
const optionId = (fullAgentName: string) => mkId(`-opt-${fullAgentName}`);

export const NameTypeTypeSelect = () => {
  const {
    state: {clusterName, agentName},
    selectAgent,
  } = useTask();

  const resourceAgentMap = useSelector(
    selectors.getResourceAgentMap(clusterName),
  );
  const [search, setSearch] = React.useState("");
  const [currIndex, setCurrIndex] = React.useState<number>(0);
  const [isOpen, setIsOpen] = React.useState(false);
  const textInputRef = React.useRef<HTMLInputElement>();
  const [inputValue, setInputValue] = React.useState<string>(agentName);

  const filteredResourceAgentMap = React.useMemo(
    () =>
      enhanceAgentMap(
        filterSources(search, resourceAgentMap ?? ({} as ResourceAgentMap)),
      ),
    [resourceAgentMap, search],
  );

  const itemsCount = Object.keys(filteredResourceAgentMap).reduce(
    (count, group) => count + filteredResourceAgentMap[group].length,
    0,
  );

  const onSelect = (fullAgentName: string) => {
    setInputValue(fullAgentName);
    selectAgent(fullAgentName);
  };

  const selectIndex = (i: number) => {
    const item = findByIndex(filteredResourceAgentMap, i);
    onSelect(item === null ? "" : item.fullAgentName);
  };

  const [prevIndex, nextIndex] = React.useMemo(
    () =>
      currIndex === null ? [itemsCount - 1, 0] : [currIndex - 1, currIndex + 1],
    [itemsCount, currIndex],
  );

  const open = React.useCallback(() => setIsOpen(true), []);
  const close = () => setIsOpen(false);
  const switchOpen = () => setIsOpen(isOpenCurrently => !isOpenCurrently);
  const isFocused = (index: number) => currIndex === index;

  const onInputValueChange = (
    _event: React.FormEvent<HTMLInputElement>,
    value: string,
  ) => {
    setSearch(value);
    setInputValue(value);
    setCurrIndex(0);
    open();
  };

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "Enter":
        event.preventDefault();
        selectIndex(currIndex);
        break;
      case "Tab":
      case "Escape":
        close();
        break;
      case "ArrowUp":
        event.preventDefault();
        setCurrIndex(prevIndex);
        break;
      case "ArrowDown":
        event.preventDefault();
        setCurrIndex(nextIndex);
        break;
    }
  };

  return (
    <Flex>
      {!resourceAgentMap && (
        <FlexItem>
          <Spinner size="lg" />
        </FlexItem>
      )}
      <FlexItem grow={grow}>
        <span {...testMarks.task.resourceCreate.nameType.agentName.mark}>
          <Select
            id="typeahead-select"
            isOpen={isOpen}
            selected={agentName}
            onSelect={(_event, value) => {
              onSelect(`${value}`);
              close();
            }}
            onOpenChange={close}
            isScrollable
            toggle={toggleRef => (
              <MenuToggle
                ref={toggleRef}
                variant="typeahead"
                onClick={switchOpen}
                isExpanded={isOpen}
                isFullWidth
              >
                <TextInputGroup isPlain>
                  <TextInputGroupMain
                    value={inputValue}
                    onClick={switchOpen}
                    onChange={onInputValueChange}
                    onKeyDown={onInputKeyDown}
                    id={mkId("-input")}
                    autoComplete="off"
                    innerRef={textInputRef}
                    placeholder="Search"
                    {...(agentName !== "" && {
                      "aria-activedescendant": optionId(agentName),
                    })}
                    role="combobox"
                    isExpanded={isOpen}
                    aria-controls={mkId("-listbox")}
                  />
                  <TextInputGroupUtilities>
                    {!!inputValue && (
                      <Button
                        variant="plain"
                        onClick={() => {
                          selectAgent("");
                          setInputValue("");
                          setSearch("");
                          textInputRef?.current?.focus();
                        }}
                        aria-label="Clear input value"
                      >
                        <TimesIcon aria-hidden />
                      </Button>
                    )}
                  </TextInputGroupUtilities>
                </TextInputGroup>
              </MenuToggle>
            )}
          >
            {Object.keys(filteredResourceAgentMap).map(group => (
              <SelectGroup label={group} key={group}>
                {filteredResourceAgentMap[group].map(agentInfo => (
                  <SelectOption
                    id={optionId(agentInfo.fullAgentName)}
                    key={agentInfo.fullAgentName}
                    value={agentInfo.fullAgentName}
                    isFocused={isFocused(agentInfo.globalIndex)}
                    ref={null}
                  >
                    {agentInfo.agentName}
                  </SelectOption>
                ))}
              </SelectGroup>
            ))}
          </Select>
        </span>
      </FlexItem>
    </Flex>
  );
};
