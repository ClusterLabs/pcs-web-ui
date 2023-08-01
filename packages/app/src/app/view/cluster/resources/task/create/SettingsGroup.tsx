import {Checkbox, Flex, FlexItem, FormGroup} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {FormSelectOrText, FormText, Select} from "app/view/share";

import {useTask} from "./useTask";

const {settings} = testMarks.task.resourceCreate;

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
          {...settings.useGroup.mark}
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
              selectLabel="Select existing group"
              select={
                <Select
                  selections={groupIdList.includes(group) ? group : ""}
                  isDisabled={!useGroup}
                  optionsValues={groupIdList}
                  onSelect={value => updateState({group: value.toString()})}
                  {...settings.existingGroup.mark}
                />
              }
              textLabel="Create new group"
              text={
                <FormText
                  id="create-new-group"
                  value={group}
                  isRequired
                  onChange={value => updateState({group: value})}
                  helperTextInvalid="Please provide a name for the new group"
                  showValidationErrors={showValidationErrors}
                  isValid={useGroup !== "new" || group.length > 0}
                  {...settings.newGroup.mark}
                />
              }
            />
          </FormGroup>
        </FlexItem>
      )}
    </Flex>
  );
};
