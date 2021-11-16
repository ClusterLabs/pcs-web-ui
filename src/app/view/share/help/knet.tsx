import { clusterSetup } from "app/backend";

import type { Help } from "./help";
type SetupData = Parameters<typeof clusterSetup>[0]["setupData"];
type KnetOptions = NonNullable<
  Extract<SetupData, { transport_type: "knet" }>["transport_options"]
>;
type CompressionOptions = NonNullable<SetupData["compression_options"]>;
type CryptoOptions = NonNullable<SetupData["crypto_options"]>;

export const options: Partial<Record<keyof KnetOptions, Help>> = {
  ip_version: {
    header: "Ip version",
    body: (
      <>
        <p>
          This specifies version of IP to ask DNS resolver for. The value can be
          one of ipv4 (look only for an IPv4 address) , ipv6 (check only IPv6
          address) , ipv4-6 (look for all address families and use first IPv4
          address found in the list if there is such address, otherwise use
          first IPv6 address) and ipv6-4 (look for all address families and use
          first IPv6 address found in the list if there is such address,
          otherwise use first IPv4 address).
        </p>
        <p>
          Default (if unspecified) is ipv6-4 for knet and udpu transports and
          ipv4 for udp.
        </p>
        <p>
          The knet transport supports IPv4 and IPv6 addresses concurrently,
          provided they are consistent on each link.
        </p>
        <p>
          Within the totem directive, there are several configuration options
          which are used to control the operation of the protocol. It is
          generally not recommended to change any of these values without proper
          guidance and sufficient testing. Some networks may require larger
          values if suffering from frequent reconfigurations. Some applications
          may require faster failure detection times which can be achieved by
          reducing the token timeout.
        </p>
      </>
    ),
    defaultValue: "ipv6-4",
  },

  knet_pmtud_interval: {
    header: "PMTUd Interval",
    body: (
      <>
        How often the knet PMTUd runs to look for network MTU changes. Value in
        seconds.
      </>
    ),
    defaultValue: "60",
  },

  link_mode: {
    header: "Link mode",
    body: (
      <>
        <p>This specifies the knet mode.</p>
        <p>
          passive: The active link with the lowest priority will be used. If one
          or more links share the same priority the one with the lowest link ID
          will be used.
        </p>
        <p>
          active: All active links will be used simultaneously to send traffic,
          link priority is ignored.
        </p>
        <p>
          round-robin: Each packet will be sent to the next active link in
          order.
        </p>
        <p>
          If only one interface directive is specified, passive is automatically
          chosen.
        </p>
      </>
    ),
  },
};

export const compression: Partial<Record<keyof CompressionOptions, Help>> = {
  level: {
    header: "Level",
    body: (
      <p>
        Many compression libraries allow tuning of compression parameters. For
        example 0 or 1 ... 9 are commonly used to determine the level of
        compression. This value is passed unmodified to the compression library
        so it is recommended to consult the library's documentation for more
        detailed information.
      </p>
    ),
  },
  model: {
    header: "Model",
    body: (
      <p>
        The (optional) type of compression used by knet. The values available
        depend on the build and also available libraries. Typically zlib and lz4
        will be available but bzip2 and others could also be allowed.
      </p>
    ),
    defaultValue: "none",
  },
  threshold: {
    header: "threshold",
    body: (
      <p>
        Tells knet to NOT compress any packets that are smaller than the value
        indicated. Set to 0 to reset to the default. Set to 1 to compress
        everything.
      </p>
    ),
    defaultValue: "100 bytes",
  },
};

export const crypto: Partial<Record<keyof CryptoOptions, Help>> = {
  model: {
    header: "Model",
    body: (
      <p>This specifies which cryptographic library should be used by knet.</p>
    ),
    defaultValue: "nss",
  },
  hash: {
    header: "Hash",
    body: (
      <p>
        This specifies which HMAC authentication should be used to authenticate
        all messages.
      </p>
    ),
    defaultValue: "sha256",
  },
  cipher: {
    header: "Cipher",
    body: (
      <p>
        This specifies which cipher should be used to encrypt all messages.
        Enabling Cipher requires also enabling of Hash.
      </p>
    ),
    defaultValue: "aes256",
  },
};
