import { clusterSetup } from "app/backend";

import type { Help } from "./help";
type SetupParams = Parameters<typeof clusterSetup>[0];
type KnetOptions = NonNullable<
  Extract<
    SetupParams["setupData"],
    { transport_type: "knet" }
  >["transport_options"]
>;

export const options: Partial<Record<keyof KnetOptions, Help>> = {
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
