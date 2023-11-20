import {Form} from "@patternfly/react-core";

import {
  FormRadios,
  FormResourceSetField,
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

              <FormRadios
                label="role"
                className="pf-u-mt-sm"
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
