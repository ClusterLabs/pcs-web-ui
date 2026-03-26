import * as cs from "dev/responses/clusterStatus/tools";

import {assert, mock} from "test/tools";

import {clusterName} from "./common";
import {goToPrimitive} from "./commonPrimitive";

const {tabs, attributes} = marks.cluster.resources.currentPrimitive;

const resourceId = "A";

const instanceAttrs = [
  {id: "A-ia-configfile", name: "configfile", value: "lrm://"},
  {id: "A-ia-httpd", name: "httpd", value: "/usr/sbin/httpd"},
];

describe("Primitive attributes view", () => {
  afterEach(mock.stop);

  it("should render attributes with cib secret", async () => {
    mock.shortcuts.withCluster({
      clusterStatus: cs.cluster(clusterName, "ok", {
        resource_list: [
          cs.primitive(resourceId, {
            agentname: "ocf:heartbeat:apache",
            type: "apache",
            instance_attr: instanceAttrs,
          }),
        ],
      }),
    });

    await goToPrimitive(resourceId);
    await click(tabs.attributes);

    await assert.nvPairIs(attributes.pair, "httpd", "/usr/sbin/httpd");
    await isVisible(item.byName(attributes.pair, "configfile", p => p.secret));
    await assert.textIs(
      item.byName(attributes.pair, "httpd", p => p.value),
      instanceAttrs[1].value,
    );
  });
});
