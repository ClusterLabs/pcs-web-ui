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
      libCall: {reports},
      showValidationErrors,
      offeredResourceIdList,
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
                label="Action"
                className="pf-u-mt-sm"
                id={`resource-set-${i}-action`}
                options={[
                  "no limitation",
                  "start",
                  "stop",
                  "promote",
                  "demote",
                ]}
                selected={set.action}
                onChange={value => update({action: value})}
                popover={{
                  header: "Action",
                  body: "Limit the effect of the constraint to the specified action.",
                }}
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
                      <p className="pf-u-mt-sm">
                        Disabled value makes sense only if there is another set
                        in the constraint.
                      </p>
                    </>
                  ),
                }}
              />

              <FormSwitch
                id={`resource-set-${i}-require-all`}
                label="Require all"
                isChecked={set.requireAll}
                onChange={() => update({requireAll: !set.requireAll})}
                isDisabled={set.sequential}
                popover={{
                  header: "Require all",
                  body: (
                    <>
                      <p>
                        Whether all members of the set must be active before
                        continuing.
                      </p>
                      <p className="pf-u-mt-sm">
                        With the current implementation, the cluster may
                        continue even if only one member of the set is started,
                        but if more than one member of the set is starting at
                        the same time, the cluster will still wait until all of
                        those have started before continuing (this may change in
                        future versions).
                      </p>
                      <p className="pf-u-mt-sm">
                        Disabled value makes sense only in conjunction with
                        disabled value of sequential. Think of it like this:
                        disabled sequential modifies the set to be an unordered
                        set using &quot;AND&quot; logic by default, and
                        disabling require all flips the unordered set’s
                        &quot;AND&quot; logic to &quot;OR&quot; logic.
                      </p>
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
