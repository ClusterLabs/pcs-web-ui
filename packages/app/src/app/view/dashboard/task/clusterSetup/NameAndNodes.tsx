import {Button, Form} from "@patternfly/react-core";
import {PlusCircleIcon, TrashIcon} from "@patternfly/react-icons";

import {subDataTest} from "app/view/dataTest";
import {FormGroup, FormText, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

export const NameAndNodes = () => {
  const {
    state: {clusterName, nodeNameList, showValidationErrors},
    allReports,
    isClusterNameValid,
    areNodeNamesValid,
    updateClusterName,
    updateNode,
  } = useTask();
  const dataTest = subDataTest("setupCluster.nameAndNodes");
  return (
    <TaskLibStep
      title="Essential information about cluster"
      reports={allReports}
    >
      <Form {...dataTest(".")}>
        <FormText
          id="cluster-name"
          value={clusterName}
          onChange={value => updateClusterName({clusterName: value})}
          label="Cluster name"
          helperTextInvalid="Please provide the cluster name"
          showValidationErrors={showValidationErrors}
          isValid={isClusterNameValid}
          {...dataTest("clusterName")}
        />

        <FormGroup label="Node name list" fieldId="node-list">
          <table>
            <tbody>
              {nodeNameList.map((nodeName, i) => (
                <tr key={i} {...dataTest("node")}>
                  <td className="pf-u-pr-sm pf-u-pb-sm">
                    <FormText
                      id={`node-name-${i}`}
                      value={nodeName}
                      onChange={value =>
                        updateNode({
                          nodeNameList: nodeNameList.map((nodeName, index) =>
                            i === index ? value : nodeName,
                          ),
                        })
                      }
                      {...dataTest("node.name")}
                      {...(i === nodeNameList.length - 1
                        ? {
                            helperTextInvalid:
                              "Please provide at least one node name",
                            showValidationErrors,
                            isValid: areNodeNamesValid,
                          }
                        : {})}
                    />
                  </td>
                  <td>
                    <Button
                      variant="link"
                      className="pf-u-m-0 pf-u-p-0"
                      isDisabled={nodeNameList.length < 2}
                      onClick={() =>
                        updateNode({
                          nodeNameList: nodeNameList.filter(
                            (_nodeName, index) => i !== index,
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
            onClick={() => updateNode({nodeNameList: [...nodeNameList, ""]})}
            icon={<PlusCircleIcon />}
            className="pf-u-mt-sm"
          >
            Add node
          </Button>
        </FormGroup>
      </Form>
    </TaskLibStep>
  );
};
