import { Button, Form } from "@patternfly/react-core";
import { PlusCircleIcon, TrashIcon } from "@patternfly/react-icons";

import { FormGroup, FormText, TaskLibStep } from "app/view/share";

import { useTask } from "./useTask";

export const Configure = () => {
  const {
    isNameValid,
    updateState,
    state: {
      subjectId,
      roleList,
      showValidationErrors,
      libCall: { reports },
    },
  } = useTask();

  return (
    <TaskLibStep title="Enter name" reports={reports}>
      <Form>
        <FormText
          id="subject-name"
          label="Name"
          isRequired
          showValidationErrors={showValidationErrors}
          isValid={isNameValid}
          helperTextInvalid="Please enter a name"
          onChange={value => updateState({ subjectId: value })}
          value={subjectId}
        />

        <FormGroup label="Roles" fieldId="roles-assigned">
          <table>
            <tbody>
              {roleList.map((roleName, i) => (
                <tr key={i}>
                  <td className="pf-u-pr-sm pf-u-pb-sm">
                    <FormText
                      id={`role-name-${i}`}
                      value={roleName}
                      onChange={value =>
                        updateState({
                          roleList: roleList.map((roleName, index) =>
                            i === index ? value : roleName,
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
                          roleList: roleList.filter(
                            (_roleName, index) => i !== index,
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
            onClick={() => updateState({ roleList: [...roleList, ""] })}
            icon={<PlusCircleIcon />}
            className="pf-u-mt-sm"
          >
            Assign role
          </Button>
        </FormGroup>
      </Form>
    </TaskLibStep>
  );
};
