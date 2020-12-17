import React from "react";
import { Button, Form, Modal, TextInput } from "@patternfly/react-core";

import { useAuth } from "./useAuth";

export const ClusterIssueNotAuthForm: React.FC<{
  authProcessId: number;
  cancel: () => void;
}> = ({ cancel, authProcessId }) => {
  const {
    state: { nodeMap },
    updateNode,
    nodeAuth,
  } = useAuth(authProcessId);
  return (
    <Modal
      variant="large"
      title="Authentication of nodes"
      isOpen
      onClose={cancel}
      actions={[
        <Button key="Authenticate" variant="primary" onClick={nodeAuth}>
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
              const passwordId = `auth-node-${nodeName}-password`;
              const addressId = `auth-node-${nodeName}-address`;
              const portId = `auth-node-${nodeName}-port`;
              return (
                <tr key={nodeName}>
                  <td>
                    <label htmlFor={passwordId}>{`${nodeName}`}</label>
                  </td>
                  <td>
                    <TextInput
                      isRequired
                      type="password"
                      id={passwordId}
                      name={passwordId}
                      data-test={passwordId}
                      value={nodeMap[nodeName].password}
                      onChange={password => updateNode(nodeName, { password })}
                    />
                  </td>
                  <td>
                    <TextInput
                      isDisabled
                      isRequired
                      type="text"
                      id={addressId}
                      name={addressId}
                      data-test={addressId}
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
                      id={portId}
                      name={portId}
                      data-test={portId}
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
