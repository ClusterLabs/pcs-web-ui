import React from "react";
import { Form } from "@patternfly/react-core";

import { FormRadios, FormSwitch, FormText } from "app/view/share";

import { useTask } from "./useTask";

export const Options: React.FC = () => {
  const {
    updateState,
    state: { id, kind, symmetrical },
  } = useTask();
  return (
    <Form isHorizontal>
      <FormText
        id="constraint-order-set-id"
        label="Constraint id"
        onChange={value => updateState({ id: value })}
        value={id}
        popover={{
          header: "Constraint id",
          body: (
            <>
              You can optionally put constraint id here. Constraint id will be
              generated automatically if constraint id is not specified.
            </>
          ),
        }}
      />

      <FormRadios
        id="constraint-order-set-kind"
        label="Kind"
        options={["Mandatory", "Optional", "Serialize"]}
        selected={kind}
        onChange={value => updateState({ kind: value })}
        popover={{
          header: "How to enforce the constraint.",
          body: (
            <>
              Allowed values:
              <dl>
                <dd>
                  <strong>Mandatory</strong>
                </dd>
                <dt>
                  then-action will never be initiated for the then resource
                  unless and until first-action successfully completes for the
                  first resource.{" "}
                </dt>
                <dd>
                  <strong>Optional</strong>
                </dd>
                <dt>
                  The constraint applies only if both specified resource actions
                  are scheduled in the same transition (that is, in response to
                  the same cluster state). This means that then-action is
                  allowed on the then resource regardless of the state of the
                  first resource, but if both actions happen to be scheduled at
                  the same time, they will be ordered.
                </dt>
                <dd>
                  <strong>Serialize</strong>
                </dd>
                <dt>
                  Ensure that the specified actions are never performed
                  concurrently for the specified resources. First-action and
                  then-action can be executed in either order, but one must
                  complete before the other can be initiated. An example use
                  case is when resource start-up puts a high load on the host.
                </dt>
              </dl>
            </>
          ),
        }}
      />

      <FormSwitch
        id="constraint-order-set-symmetrical"
        label="Symmetrical"
        popover={{
          header: "Symmetrical",
          body: (
            <>
              <p>
                If true, the reverse of the constraint applies for the opposite
                action (for example, if B starts after A starts, then B stops
                before A stops).
              </p>
              <p>Serialize orders cannot be symmetrical.</p>
            </>
          ),
        }}
        isDisabled={kind === "Serialize"}
        isChecked={kind !== "Serialize" && symmetrical}
        onChange={() => updateState({ symmetrical: !symmetrical })}
      />
    </Form>
  );
};
