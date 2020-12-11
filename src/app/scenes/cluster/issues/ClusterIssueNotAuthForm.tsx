import React from "react";
import { Button, Form, Modal, TextInput } from "@patternfly/react-core";

import { useAuth } from "./useAuth";

export const ClusterIssueNotAuthForm: React.FC<{
  initialNodeList: string[];
  cancel: () => void;
}> = ({ initialNodeList, cancel }) => {
  const {
    state: { nodeMap },
  } = useAuth(initialNodeList);
  return (
    <Modal
      variant="large"
      title="Authentication of nodes"
      isOpen
      onClose={cancel}
      actions={[
        <Button key="Authenticate" variant="primary">
          Authenticate
        </Button>,
        <Button key="Cancel" variant="link" onClick={cancel}>
          Cancel
        </Button>,
      ]}
    >
      <Form data-test="form-auth-node" isHorizontal>
        <table className="pf-c-table pf-m-compact pf-m-grid-md pf-m-no-border-rows">
          <thead>
            <tr>
              <th>Node</th>
              <th>Password</th>
              <th>Address</th>
              <th>Port</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(nodeMap).map((nodeName) => {
              const id = `auth-password-node-${nodeName}`;
              return (
                <tr key={nodeName}>
                  <td>
                    <label htmlFor={id}>{`${nodeName}`}</label>
                  </td>
                  <td>
                    <TextInput
                      isRequired
                      type="password"
                      id={id}
                      name={id}
                      data-test={id}
                      aria-describedby="Password for user 'hacluster' to authenticate nodes"
                      value=""
                      onChange={() => {
                        return 1;
                      }}
                    />
                  </td>
                  <td>
                    <TextInput
                      isDisabled
                      isRequired
                      type="text"
                      id={id}
                      name={id}
                      data-test={id}
                      value=""
                      onChange={() => {
                        return 1;
                      }}
                    />
                  </td>
                  <td className="pf-m-width-10">
                    <TextInput
                      isDisabled
                      isRequired
                      placeholder="2224"
                      type="text"
                      id={id}
                      name={id}
                      data-test={id}
                      value=""
                      onChange={() => {
                        return 1;
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Form>
    </Modal>
  );
};
