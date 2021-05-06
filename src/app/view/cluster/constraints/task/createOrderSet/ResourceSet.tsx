import React from "react";
import { Form, FormGroup, SelectOption } from "@patternfly/react-core";

import { selectors } from "app/store";
import {
  FormRadios,
  FormSwitch,
  Select,
  useClusterSelector,
} from "app/view/share";

import { useTask } from "./useTask";

export const ResourceSet: React.FC<{
  set: ReturnType<typeof useTask>["state"]["sets"][number];
  id: string;
  update: ReturnType<ReturnType<typeof useTask>["updateSet"]>;
  isOnlyOne: boolean;
  showValidationErrors: boolean;
}> = ({ id, set, update, isOnlyOne, showValidationErrors }) => {
  const [resourceList] = useClusterSelector(selectors.getResourcesForSet);

  const resourcesValidated =
    showValidationErrors
    && ((isOnlyOne && set.resources.length < 2) || set.resources.length === 0)
      ? "error"
      : "default";

  return (
    <Form isHorizontal>
      <FormGroup
        label="Resources"
        isRequired={true}
        fieldId={`${id}-resources`}
        helperTextInvalid={`Please provide at least ${
          isOnlyOne ? "2 resources" : "1 resource"
        }`}
        validated={resourcesValidated}
      >
        <Select
          id={`${id}-resources`}
          variant="typeaheadmulti"
          selections={set.resources}
          chipGroupProps={{ numChips: 10 }}
          onSelect={value =>
            update({
              resources: [
                ...(set.resources.includes(value)
                  ? set.resources.filter(r => r !== value)
                  : [...set.resources, value]),
              ],
            })
          }
        >
          {resourceList
            .filter(resource => !set.resources.includes(resource))
            .map(resource => (
              <SelectOption key={resource} value={resource} />
            ))}
        </Select>
      </FormGroup>

      <FormRadios
        label="Action"
        className="pf-u-mt-sm"
        id={`${id}-action`}
        options={["no limitation", "start", "stop", "promote", "demote"]}
        selected={set.action}
        onChange={value => update({ action: value })}
        popover={{
          header: "Action",
          body: "Limit the effect of the constraint to the specified action.",
        }}
      />

      <FormSwitch
        id={`${id}-sequential`}
        label="Sequential"
        isChecked={set.sequential}
        onChange={() => update({ sequential: !set.sequential })}
        isDisabled={isOnlyOne}
        popover={{
          header: "Sequential",
          body: (
            <>
              <p>Whether the members of the set must be acted on in order.</p>
              <p className="pf-u-mt-sm">
                Disabled value makes sense only if there is another set in the
                constraint.
              </p>
            </>
          ),
        }}
      />

      <FormSwitch
        id={`${id}-require-all`}
        label="Require all"
        isChecked={set.requireAll}
        onChange={() => update({ requireAll: !set.requireAll })}
        isDisabled={set.sequential}
        popover={{
          header: "Require all",
          body: (
            <>
              <p>
                Whether all members of the set must be active before continuing.
              </p>
              <p className="pf-u-mt-sm">
                With the current implementation, the cluster may continue even
                if only one member of the set is started, but if more than one
                member of the set is starting at the same time, the cluster will
                still wait until all of those have started before continuing
                (this may change in future versions).
              </p>
              <p className="pf-u-mt-sm">
                Disabled value makes sense only in conjunction with disabled
                value of sequential. Think of it like this: disabled sequential
                modifies the set to be an unordered set using &quot;AND&quot;
                logic by default, and disabling require all flips the unordered
                set’s &quot;AND&quot; logic to &quot;OR&quot; logic.
              </p>
            </>
          ),
        }}
      />
    </Form>
  );
};
