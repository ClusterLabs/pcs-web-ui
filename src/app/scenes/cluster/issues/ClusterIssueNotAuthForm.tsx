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
    state: { nodeMap, useAddresses, errorMessage, nodesResults },
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
        Object.keys(nodeMap).length === 0
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
      {errorMessage.length > 0 && (
        <Alert isInline variant="danger" title="Authentication node error">
          {errorMessage.map((message, i) => (
            <div key={i}>{message}</div>
          ))}
        </Alert>
      )}
      {nodesResults.success.length > 0 && (
        <Alert
          isInline
          variant="success"
          title="Nodes sucessfully authenticated"
        >
          {`${
            nodesResults.success.length === 1 ? "Node" : "Nodes"
          } ${nodesResults.success.join(
            ", ",
          )} has been sucessfully authenticated.`}
        </Alert>
      )}
      {nodesResults.fail.length > 0 && (
        <Alert isInline variant="danger" title="Nodes not authenticated">
          {`Authentication of ${
            nodesResults.fail.length === 1 ? "node" : "nodes"
          } ${nodesResults.fail.join(", ")} failed`}
        </Alert>
      )}
      {Object.keys(nodeMap).length > 0 && (
        <Form data-test="form-auth-node" isHorizontal>
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
