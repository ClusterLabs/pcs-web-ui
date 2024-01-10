import {Form} from "@patternfly/react-core";

import {
  FormRadios,
  FormResourceSetField,
  FormSwitch,
  ResourceSetList as ResourceSetListCommon,
  TaskLibStep,
} from "app/view/share";

import {useTask} from "./useTask";

export const ResourceSetList = () => {
  const {
    state: {
      sets,
      showValidationErrors,
      offeredResourceIdList,
      libCall: {reports},
    },
    createSet,
    updateSet,
    deleteSet,
    moveSet,
  } = useTask();

  return (
    <TaskLibStep title="Resource sets" reports={reports}>
      <ResourceSetListCommon
        sets={sets}
        createSet={createSet}
        deleteSet={deleteSet}
        moveSet={moveSet}
      >
        {({set, i}) => {
          const update = updateSet(i);
          return (
            <Form isHorizontal>
              <FormResourceSetField
                selectedResources={set.resources}
                offeredResources={offeredResourceIdList}
                id={`resource-set-${i}-resources`}
                isOnlyOne={sets.length === 1}
                showValidationErrors={showValidationErrors}
                update={selectedResources =>
                  update({resources: selectedResources})
                }
              />

              <FormSwitch
                id={`resource-set-${i}-sequential`}
                label="Sequential"
                isChecked={set.sequential}
                onChange={() => update({sequential: !set.sequential})}
                isDisabled={sets.length === 1}
                popover={{
                  header: "Sequential",
                  body: (
                    <>
                      <p>
                        Whether the members of the set must be acted on in
                        order.
                      </p>
                      <p className="pf-v5-u-mt-sm">
                        Disabled value makes sense only if there is another set
                        in the constraint.
                      </p>
                    </>
                  ),
                }}
              />

              <FormRadios
                label="role"
                className="pf-v5-u-mt-sm"
                id={`resource-set-${i}-role`}
                options={[
                  "no limitation",
                  "Started",
                  "Stopped",
                  "Promoted",
                  "Unpromoted",
                ]}
                selected={set.role}
                onChange={value => update({role: value})}
                popover={{
                  header: "Role",
                  body: (
                    <>
                      Limit the effect of the constraint to the specified role.
                    </>
                  ),
                }}
              />
            </Form>
          );
        }}
      </ResourceSetListCommon>
    </TaskLibStep>
  );
};
