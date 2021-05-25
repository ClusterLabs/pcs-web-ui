import React from "react";
import { Flex, FlexItem, Form, FormGroup, Radio } from "@patternfly/react-core";

import { FormText } from "app/view/share";

import { useTask } from "./useTask";
import { FormResourceExistingOrNew } from "./FormResourceExistingOrNew";

export const Configure: React.FC = () => {
  const [isResourceExisting, setIsResourceExisting] = React.useState(true);
  const [isWithResourceExisting, setIsWithResourceExisting] = React.useState(
    true,
  );
  const {
    updateState,
    resourceIdList,
    state: { resourceId, withResourceId, placement, score },
  } = useTask();

  return (
    <Form data-test="create-location-constrait">
      <FormResourceExistingOrNew
        label="Resource"
        checked={isResourceExisting ? "select" : "text"}
        onChange={checked => setIsResourceExisting(checked === "select")}
        resourceId={resourceId}
        resourceIdList={resourceIdList}
        updateResource={value => updateState({ resourceId: value.toString() })}
      />

      <FormResourceExistingOrNew
        label="With resource"
        checked={isWithResourceExisting ? "select" : "text"}
        onChange={checked => setIsWithResourceExisting(checked === "select")}
        resourceId={withResourceId}
        resourceIdList={resourceIdList}
        updateResource={value =>
          updateState({ withResourceId: value.toString() })
        }
      />

      <FormGroup
        label="Placement"
        isRequired
        fieldId="constraint-colocation-create-placement"
      >
        <Flex>
          <FlexItem>
            <Radio
              isChecked={placement === "together"}
              name="placement-together"
              onChange={isChecked =>
                updateState({ placement: isChecked ? "together" : "apart" })
              }
              label="Together"
              id="placement-together"
            />
          </FlexItem>
          <FlexItem>
            <Radio
              isChecked={placement === "apart"}
              name="placement-apart"
              onChange={isChecked =>
                updateState({ placement: isChecked ? "apart" : "together" })
              }
              label="Apart"
              id="placement-apart"
            />
          </FlexItem>
        </Flex>
      </FormGroup>

      <FormText
        id="constraint-score"
        label="Score"
        onChange={value => updateState({ score: value })}
        value={score}
        helperTextInvalid="Please provide score"
        isRequired
        data-test="score"
      />
    </Form>
  );
};
