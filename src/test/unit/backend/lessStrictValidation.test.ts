import * as t from "io-ts";
import {isRight} from "fp-ts/lib/Either";

import {endpoints} from "app/backend/endpoints";
import {pcmkAgent} from "app/backend/endpoints/lib/cluster/pcmkAgent";

import {cluster, node} from "dev/responses/clusterStatus/tools";
import {resourceAgentMetadata} from "dev/responses";

const {ocfHeartbeatDummy: dummy} = resourceAgentMetadata;

function matchShape<A, O, I>(shape: t.Type<A, O, I>) {
  return (value: I) => {
    const valueMatch = isRight(shape.decode(value));
    if (!valueMatch) {
      expect(
        `value (${JSON.stringify(value)}) does not match the shape (${
          shape.name
        })`,
      ).toEqual("value match");
    }
  };
}

function dontMatchShape<A, O, I>(shape: t.Type<A, O, I>) {
  return (value: I) => {
    const valueMatch = isRight(shape.decode(value));
    if (valueMatch) {
      expect(
        `value (${JSON.stringify(value)}) unexpectedly match the shape (${
          shape.name
        })`,
      ).toEqual("value don't match");
    }
  };
}

describe("Validation for cluster status", () => {
  const matchClusterStatus = matchShape(endpoints.clusterStatus.shape);
  const dontMatchClusterStatus = dontMatchShape(endpoints.clusterStatus.shape);

  // we are going to add unknown properties to clusterStatus (and to its
  // attributes), so clusterStatus is any (typescript would complain else)
  /* eslint-disable @typescript-eslint/no-explicit-any */
  let clusterStatus: any, nodeStatus: any;

  beforeEach(() => {
    clusterStatus = cluster("Cluster name", "ok", {}) as any;
    nodeStatus = node("1") as any;
  });

  it("should accept an extra cluster attribute", async () => {
    matchClusterStatus({
      ...clusterStatus,
      unknownAttr: "attr",
    });
  });

  it("should accept an extra attribute in node object", async () => {
    clusterStatus.node_list.push({...nodeStatus, unknownAttr: "attr"});
    matchClusterStatus(clusterStatus);
  });

  it("should accept extra service and its attribute on node", async () => {
    nodeStatus.services = {
      ...nodeStatus.services,
      unknonwService: {
        installed: true,
        running: true,
        enabled: true,
        unknownFlag: "string",
      },
      sbd: {
        installed: true,
        running: true,
        enabled: true,
        unknownFlag: "string",
      },
    };
    clusterStatus.node_list.push(nodeStatus);
    matchClusterStatus(clusterStatus);
  });

  it("shouldn't be possible to modify service attribute on node", async () => {
    nodeStatus.services = {
      ...nodeStatus.services,
      sbd: {
        installed: "true", // not boolean
        running: true,
        enabled: true,
      },
    };
    clusterStatus.node_list.push(nodeStatus);
    dontMatchClusterStatus(clusterStatus);
  });
});

describe("Validation for pcmk agents", () => {
  const matchAgent = matchShape(pcmkAgent);
  it("should accept new attributes", async () => {
    matchAgent({...dummy, unknownAttr: "attr"});
  });

  it("should accept new attributes for parameters", async () => {
    matchAgent({
      ...dummy,
      parameters: [
        {...dummy.parameters[0], unknownAttr: "attr"},
        ...dummy.parameters,
      ],
    });
  });

  it("should accept new attributes for parameters", async () => {
    matchAgent({
      ...dummy,
      parameters: [
        {...dummy.parameters[0], unknownAttr: "attr"},
        ...dummy.parameters,
      ],
    });
  });
  it("should accept new attributes for actions", async () => {
    // actions are there, but typescript that actions are possibly undefined,
    // because dummy is explicitly typed, so typescript does not infere from
    // real content
    const actions = dummy.actions ?? [{}];
    matchAgent({
      ...dummy,
      actions: [{...actions[0], unknownAttr: "attr"}, ...actions],
    });
  });
});
