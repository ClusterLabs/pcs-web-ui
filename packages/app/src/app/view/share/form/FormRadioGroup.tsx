import React from "react";
import {Flex, FlexItem, Radio} from "@patternfly/react-core";

export function FormRadioGroup<OPTION extends string>({
  id,
  options: optionList,
  selected,
  onChange,
  isDisabled,
  "data-test": dataTest,
}: {
  id: string;
  options: OPTION[];
  selected: OPTION;
  onChange: (_value: OPTION) => void;
  isDisabled?: React.ComponentProps<typeof Radio>["isDisabled"];
  ["data-test"]?: string;
}) {
  return (
    <Flex data-test={dataTest}>
      {optionList.map(option => (
        <FlexItem key={option}>
          <Radio
            isChecked={option === selected}
            name={`${id}-${option}`}
            onChange={isChecked => {
              if (isChecked) {
                onChange(option);
              }
            }}
            label={option}
            id={`${id}-${option}`}
            isDisabled={isDisabled}
            data-test={option}
          />
        </FlexItem>
      ))}
    </Flex>
  );
}
