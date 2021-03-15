import React from "react";
import {
  Alert,
  Form,
  Stack,
  StackItem,
  Switch,
  TextInput,
} from "@patternfly/react-core";

import { EmptyStateSpinner } from "app/view";

import { useNodesAuth } from "./useNodesAuth";

export const NodesAuthForm: React.FC<{
  authProcessId: number;
}> = ({ authProcessId }) => {
  const {
    state: {
      nodeMap,
      useAddresses,
      onePasswordForAll,
      errorMessage,
      nodesResults,
      sending,
    },
    updateNode,
    switchAddressUse,
    switchOnePasswordForAll,
  } = useNodesAuth(authProcessId);
  return (
    <Stack>
      <StackItem>
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
          <Alert
            isInline
            variant="danger"
            title="Nodes not authenticated"
            data-test="alert-nodes-not-auth"
          >
            {`Authentication of ${
              nodesResults.fail.length === 1 ? "node" : "nodes"
            } ${nodesResults.fail.join(", ")} failed`}
          </Alert>
        )}
        {sending && <EmptyStateSpinner title="Authentication in progress" />}
      </StackItem>
      <StackItem>
        <Switch
          id="add-cluster-use-custom-address-port"
          label=""
          isChecked={useAddresses}
          onChange={() => switchAddressUse(!useAddresses)}
        />{" "}
        Use custom address and port
      </StackItem>
      {Object.keys(nodeMap).length > 1 && (
        <StackItem>
          <Switch
            id="add-cluster-one-password-for-all"
            label=""
            isChecked={onePasswordForAll}
            onChange={() => switchOnePasswordForAll(!onePasswordForAll)}
          />{" "}
          Use one password for all nodes
        </StackItem>
      )}
      {Object.keys(nodeMap).length > 0 && !sending && (
        <Form data-test="form-auth-node" isHorizontal>
          <table className="pf-c-table pf-m-compact pf-m-grid-md pf-m-no-border-rows">
            <thead>
              <tr>
                <th>Node</th>
                <th>Password (for the user hacluster)</th>
                <th data-test="use-custom-address">Address</th>
                <th>Port</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(nodeMap).map((nodeName, i) => {
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
                        value={
                          i > 0 && onePasswordForAll
                            ? ""
                            : nodeMap[nodeName].password
                        }
                        onChange={password =>
                          updateNode(nodeName, { password })
                        }
                        isDisabled={i > 0 && onePasswordForAll}
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
    </Stack>
  );
};
