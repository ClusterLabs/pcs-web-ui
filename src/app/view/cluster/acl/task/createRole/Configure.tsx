import { Button, Form } from "@patternfly/react-core";
import { PlusCircleIcon, TrashIcon } from "@patternfly/react-icons";

import { FormGroup, FormText } from "app/view/share";

import { useTask } from "./useTask";

export const Configure = () => {
  const {
    isNameValid,
    updateState,
    state: { roleId, permissionInfoList, description, showValidationErrors },
  } = useTask();

  return (
    <Form>
      <FormText
        id="role-name"
        label="Name"
        isRequired
        showValidationErrors={showValidationErrors}
        isValid={isNameValid}
        helperTextInvalid="Please enter a name"
        onChange={value => updateState({ roleId: value })}
        value={roleId}
      />

      <FormText
        id="role-description"
        label="Description"
        onChange={value => updateState({ description: value })}
        value={description}
      />

      <FormGroup label="Permissions" fieldId="role-permissions">
        <table>
          <tbody>
            {permissionInfoList.map((permissionName, i) => (
              <tr key={i}>
                <td className="pf-u-pr-sm pf-u-pb-sm">
                  <FormText
                    id={`permission-name-${i}`}
                    value={permissionName}
                    onChange={value =>
                      updateState({
                        permissionInfoList: permissionInfoList.map(
                          (permissionName, index) =>
                            i === index ? value : permissionName,
                        ),
                      })
                    }
                  />
                </td>
                <td>
                  <Button
                    variant="link"
                    className="pf-u-m-0 pf-u-p-0"
                    onClick={() =>
                      updateState({
                        permissionInfoList: permissionInfoList.filter(
                          (_permission, index) => i !== index,
                        ),
                      })
                    }
                    icon={<TrashIcon />}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Button
          variant="primary"
          onClick={() =>
            updateState({ permissionInfoList: [...permissionInfoList, ""] })
          }
          icon={<PlusCircleIcon />}
          className="pf-u-mt-sm"
        >
          Add permission
        </Button>
      </FormGroup>
    </Form>
  );
};
