import {Checkbox, Flex, FlexItem, FormGroup} from "@patternfly/react-core";

import {FormSelectOrText} from "app/view/share";

import {useTask} from "./useTask";

export const SettingsGroup = () => {
  const {
    state: {useGroup, group, clone, showValidationErrors},
    updateState,
    groupIdList,
  } = useTask();
  return (
    <Flex>
      <FlexItem>
        <Checkbox
          label="Use group"
          aria-label="Use group"
          id="settings-use-group"
          isChecked={useGroup !== "no"}
          isDisabled={clone}
          onChange={(checked: boolean) => {
            let value: typeof useGroup = "no";
            if (checked) {
              value =
                group.length === 0 || groupIdList.includes(group)
                  ? "existing"
                  : "new";
            }
            updateState({
              useGroup: value,
              group: value === "existing" ? groupIdList[0] : "",
            });
          }}
        />
      </FlexItem>
      {useGroup !== "no" && (
        <FlexItem>
          <FormGroup fieldId="settings-group-existing">
            <FormSelectOrText
              id="settings-group"
              checked={useGroup === "existing" ? "select" : "text"}
              onChange={checked =>
                updateState({
                  useGroup: checked === "select" ? "existing" : "new",
                  group: checked === "select" ? groupIdList[0] : "",
                })
              }
              showValidationErrors={showValidationErrors}
              select={{
                label: "Select existing group",
                selections: groupIdList.includes(group) ? group : "",
                isDisabled: !useGroup,
                optionsValues: groupIdList,
                onSelect: value => updateState({group: value.toString()}),
              }}
              text={{
                label: "Create new group",
                value: group,
                onChange: value => updateState({group: value}),
                helperTextInvalid: "Please provide a name for the new group",
                isValid: useGroup !== "new" || group.length > 0,
              }}
            />
          </FormGroup>
        </FlexItem>
      )}
    </Flex>
  );
};
