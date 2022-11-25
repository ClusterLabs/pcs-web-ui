import {Form} from "@patternfly/react-core";

import {
  FormRadios,
  FormResourceSetField,
  ResourceSetList as ResourceSetListCommon,
  TaskLibStep,
} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";
import {getResourcesForSet} from "app/view/cluster/constraints/select";

import {useTask} from "./useTask";

export const ResourceSetList = () => {
  const {
    state: {
      sets,
      showValidationErrors,
      libCall: {reports},
    },
    createSet,
    updateSet,
    deleteSet,
    moveSet,
  } = useTask();
  const resourceList = getResourcesForSet(useLoadedCluster().resourceTree);

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
                offeredResources={resourceList}
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
