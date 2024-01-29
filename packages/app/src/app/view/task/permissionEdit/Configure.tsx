import {Form} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {FormRadios, FormSwitch, FormText} from "app/view/share";

import {useTask} from "./useTask";

const {permissionEdit: task} = testMarks.task;

export const Configure = () => {
  const {
    updateState,
    isNameValid,
    areCompetenciesValid,
    state: {name, type, showValidationErrors, read, write, grant, full},
  } = useTask();

  return (
    <>
      <Form>
        <FormText
          id="permission-name"
          label="Name"
          onChange={value => updateState({name: value})}
          value={name}
          showValidationErrors={showValidationErrors}
          isValid={isNameValid}
          helperTextInvalid="Please enter a name"
          {...task.permissionName.mark}
        />
        <FormRadios
          label="Type"
          id="permission-user-group-type"
          options={["user", "group"]}
          selected={type}
          onChange={value =>
            updateState({
              type: value.toString() as typeof type,
            })
          }
          {...task.permissionType.mark}
        />
      </Form>
      <Form isHorizontal className="pf-v5-u-mt-md">
        <FormSwitch
          id="allow-read"
          label="Read"
          switchLabel="Allowed"
          switchLabelOff="Disallowed"
          isChecked={read}
          onChange={allow => updateState({read: allow})}
          popover={{
            header: "Allows to view cluster settings",
            body: "",
          }}
          {...task.read.mark}
        />
        <FormSwitch
          id="allow-write"
          label="Write"
          switchLabel="Allowed"
          switchLabelOff="Disallowed"
          isChecked={write}
          onChange={allow => updateState({write: allow})}
          popover={{
            header:
              "Allows to modify cluster settings except permissions and ACLs",
            body: "",
          }}
          {...task.write.mark}
        />
        <FormSwitch
          id="allow-grant"
          label="Grant"
          switchLabel="Allowed"
          switchLabelOff="Disallowed"
          isChecked={grant}
          onChange={allow => updateState({grant: allow})}
          popover={{
            header: "Allows to modify cluster permissions and ACLs",
            body: "",
          }}
          {...task.grant.mark}
        />
        <FormSwitch
          id="allow-full"
          label="Full"
          switchLabel="Allowed"
          switchLabelOff="Disallowed"
          isChecked={full}
          onChange={allow => updateState({full: allow})}
          showValidationErrors={showValidationErrors}
          isValid={areCompetenciesValid}
          helperTextInvalid="Please select at least one permission"
          popover={{
            header:
              "Allows unrestricted access to a cluster except for adding nodes",
            body: "",
          }}
          {...task.full.mark}
        />
      </Form>
    </>
  );
};
