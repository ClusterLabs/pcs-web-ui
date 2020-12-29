import React from "react";
import {
  Alert,
  Button,
  Form,
  Modal,
  Switch,
  TextInput,
} from "@patternfly/react-core";

import { useAuth } from "./useAuth";

export const ClusterIssueNotAuthForm: React.FC<{
  authProcessId: number;
  cancel: () => void;
}> = ({ cancel, authProcessId }) => {
  const {
    state: { nodeMap, processStatus, useAddresses, errorMessage },
    updateNode,
    nodeAuth,
    switchAddressUse,
  } = useAuth(authProcessId);
  return (
    <Modal
      variant="large"
      title="Authentication of nodes"
      isOpen
      onClose={cancel}
      actions={
        processStatus === "success"
          ? [
              <Button key="Cancel" variant="primary" onClick={cancel}>
                Close
              </Button>,
            ]
          : [
              <Button key="Authenticate" variant="primary" onClick={nodeAuth}>
                Authenticate
              </Button>,
              <Button key="Cancel" variant="link" onClick={cancel}>
                Cancel
              </Button>,
            ]
      }
    >
      {processStatus === "success" && (
        <Alert
          variant="success"
          title="Nodes successfully authenticated"
          isInline
        />
      )}
      {processStatus !== "success" && (
        <Form data-test="form-auth-node" isHorizontal>
          {processStatus === "error" && (
            <Alert isInline variant="danger" title="Authentication node error">
              {errorMessage}
            </Alert>
          )}
          <table className="pf-c-table pf-m-compact pf-m-grid-md pf-m-no-border-rows">
            <thead>
              <tr>
                <th>Node</th>
                <th>Password</th>
                <th>
                  <Switch
                    id="add-cluster-use-custom-address-port"
                    label=""
                    isChecked={useAddresses}
                    onChange={() => switchAddressUse(!useAddresses)}
                  />
                  Address
                </th>
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
                        onChange={password =>
                          updateNode(nodeName, { password })
                        }
                      />
                    </td>
                    <td>
                      <TextInput
                        isDisabled={!useAddresses}
                        type="text"
                        id={addressId}
                        name={addressId}
                        data-test={addressId}
                        value={nodeMap[nodeName].address}
                        onChange={address => updateNode(nodeName, { address })}
                      />
                    </td>
                    <td className="pf-m-width-10">
                      <TextInput
                        isDisabled={!useAddresses}
                        placeholder="2224"
                        type="text"
                        id={portId}
                        name={portId}
                        data-test={portId}
                        value={nodeMap[nodeName].port}
                        onChange={port => updateNode(nodeName, { port })}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Form>
      )}
    </Modal>
  );
};
