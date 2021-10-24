import React from "react";
import { Form } from "@patternfly/react-core";

import { FormGroup, FormSelect, FormText } from "app/view/share";

import { useTask } from "./useTask";

type Link = Parameters<ReturnType<typeof useTask>["updateLinkKnet"]>[0];

export const TransportKnetLink: React.FC<{ link: Link }> = ({ link }) => {
  const { updateLinkKnet } = useTask();

  const updateLink = React.useCallback(
    (options: Partial<Link>) => {
      updateLinkKnet({ ...link, ...options });
    },
    [link, updateLinkKnet],
  );

  return (
    <Form className="pf-u-m-lg">
      <FormGroup label="Node list" fieldId="node-list"></FormGroup>
      <table>
        <tbody>
          {Object.keys(link.addresses).map((nodeName, i) => (
            <tr key={nodeName} className="pf-u-m-sm">
              <td>{nodeName}</td>
              <td className="pf-u-p-sm">
                <FormText
                  id={`node-name-${nodeName}`}
                  value={link.addresses[nodeName]}
                  onChange={value =>
                    updateLink({
                      addresses: { ...link.addresses, [nodeName]: value },
                    })
                  }
                  data-test={`knet-link-node-${i}`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <FormText
        label="Link priority"
        id="link_priority"
        popover={{
          header: "Link priority",
          body: (
            <>
              Specifies the priority for the link when knet is used in
              &apos;passive&apos; mode.
            </>
          ),
        }}
        value={link.link_priority || ""}
        onChange={value => updateLink({ link_priority: value })}
        data-test="link_priority"
      />
      <FormText
        label="Port"
        id="mcastport"
        popover={{
          header: "Knet mcastport",
          body: (
            <>
              Port number to be used for communication. The default remains the
              old one of 5405 + linknumber, but you can override it per link
              here.
            </>
          ),
        }}
        value={link.mcastport || ""}
        onChange={value => updateLink({ mcastport: value })}
        data-test="mcastport"
      />
      <FormText
        label="Ping interval"
        id="ping_interval"
        popover={{
          header: "Ping interval",
          body: (
            <>
              Specifies the interval between knet link pings. Ping Interval and
              Ping Timeout are a pair, if one is specified the other should be
              too, otherwise one will be calculated from the token timeout and
              one will be taken from the config file.
            </>
          ),
          defaultValue: "Token Timeout / (Pong Count * 2)",
        }}
        value={link.ping_interval || ""}
        onChange={value => updateLink({ ping_interval: value })}
        data-test="ping_interval"
      />
      <FormText
        label="Ping precision"
        id="ping_precision"
        popover={{
          header: "Ping precision",
          body: (
            <>
              How many values of latency are used to calculate the average link
              latency.
            </>
          ),
          defaultValue: "2048 samples",
        }}
        value={link.ping_precision || ""}
        onChange={value => updateLink({ ping_precision: value })}
        data-test="ping_precision"
      />
      <FormText
        label="Ping timeout"
        id="ping_timeout"
        popover={{
          header: "Ping timeout",
          body: (
            <>
              If no ping is received within this time, the knet link is declared
              dead. Ping Interval and Ping Timeout are a pair, if one is
              specified the other should be too, otherwise one will be
              calculated from the token timeout and one will be taken from the
              config file.
            </>
          ),
          defaultValue: "Token Timeout / (Pong Count * 2)",
        }}
        value={link.ping_timeout || ""}
        onChange={value => updateLink({ ping_timeout: value })}
        data-test="ping_timeout"
      />
      <FormText
        label="Pong count"
        id="pong_count"
        popover={{
          header: "Pong count",
          body: "How many valid ping/pongs before a link is marked UP.",
          defaultValue: "Token Timeout / (Pong Count * 2)",
        }}
        value={link.pong_count || ""}
        onChange={value => updateLink({ pong_count: value })}
        data-test="pong_count"
      />

      <FormSelect
        label="transport"
        id="transport"
        popover={{
          header: "Transport",
          body: "Which IP transport knet should use.",
          defaultValue: "udp",
        }}
        onSelect={value =>
          updateLink({
            transport: value.toString() as NonNullable<Link["transport"]>,
          })
        }
        placeholderText="Select transport"
        selections={link.transport}
        optionsValues={["udp", "sctp"]}
        data-test="transport"
      />
    </Form>
  );
};
