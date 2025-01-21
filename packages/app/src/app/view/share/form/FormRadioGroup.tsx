import type React from "react";
import {Flex, FlexItem} from "@patternfly/react-core";

import {Radio} from "./Radio";

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
  "data-test"?: string;
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
          />
        </FlexItem>
      ))}
    </Flex>
  );
}
