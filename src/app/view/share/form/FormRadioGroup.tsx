import React from "react";
import { Flex, FlexItem, Radio } from "@patternfly/react-core";

export function FormRadioGroup<OPTION extends string>({
  id,
  options,
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
      {options.map(o => (
        <FlexItem key={o}>
          <Radio
            isChecked={o === selected}
            name={`${id}-${o}`}
            onChange={isChecked => {
              if (isChecked) {
                onChange(o);
              }
            }}
            label={o}
            id={`${id}-${o}`}
            isDisabled={isDisabled}
            data-test="abcd-radio"
          />
        </FlexItem>
      ))}
    </Flex>
  );
}
