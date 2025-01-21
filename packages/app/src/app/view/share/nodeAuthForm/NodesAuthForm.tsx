import type React from "react";
import {Alert, Form, Stack, StackItem} from "@patternfly/react-core";

import {Switch} from "app/view/share/form";
import {EmptyStateSpinner} from "app/view/share/emptyState";

import {useNodesAuth} from "./useNodesAuth";
import {NodesAuthProcesProvider} from "./NodesAuthProcessContext";

export const NodesAuthForm = (props: {
  authProcessId: number;
  customAddresSwitcher: React.ReactNode;
  inputPassword: (
    nodeName: string,
    elementId: string,
    index: number,
  ) => React.ReactNode;
  inputAddress: (
    nodeName: string,
    elementId: string,
    index: number,
  ) => React.ReactNode;
  inputPort: (
    nodeName: string,
    elementId: string,
    index: number,
  ) => React.ReactNode;
  "data-test"?: string;
}) => {
  const {
    state: {nodeMap, onePasswordForAll, errorMessage, nodesResults, sending},
    switchOnePasswordForAll,
  } = useNodesAuth(props.authProcessId);
  return (
    <NodesAuthProcesProvider value={{processId: props.authProcessId}}>
      <Stack data-test={props["data-test"]}>
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
              title="Nodes successfully authenticated"
            >
              {`${
                nodesResults.success.length === 1 ? "Node" : "Nodes"
              } ${nodesResults.success.join(
                ", ",
              )} has been successfully authenticated.`}
            </Alert>
          )}
          {nodesResults.fail.length > 0 && (
            <Alert isInline variant="danger" title="Nodes not authenticated">
              {`Authentication of ${
                nodesResults.fail.length === 1 ? "node" : "nodes"
              } ${nodesResults.fail.join(", ")} failed`}
            </Alert>
          )}
          {sending && <EmptyStateSpinner title="Authentication in progress" />}
        </StackItem>
        {!sending && Object.keys(nodeMap).length > 0 && (
          <Form isHorizontal>
            {props.customAddresSwitcher}
            {Object.keys(nodeMap).length > 1 && (
              <StackItem>
                <Switch
                  id="add-cluster-one-password-for-all"
                  label=""
                  aria-label="one password for all"
                  isChecked={onePasswordForAll}
                  onChange={() => switchOnePasswordForAll(!onePasswordForAll)}
                />{" "}
                Use one password for all nodes
              </StackItem>
            )}
            <table className="pf-v5-c-table pf-v5-m-compact pf-v5-m-grid-md pf-v5-m-no-border-rows">
              <thead>
                <tr>
                  <th>Node</th>
                  <th>Password (for the user hacluster)</th>
                  <th>Address</th>
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
                      <td>{props.inputPassword(nodeName, passwordId, i)}</td>
                      <td>{props.inputAddress(nodeName, addressId, i)}</td>
                      <td className="pf-v5-m-width-10">
                        {props.inputPort(nodeName, portId, i)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Form>
        )}
      </Stack>
    </NodesAuthProcesProvider>
  );
};
