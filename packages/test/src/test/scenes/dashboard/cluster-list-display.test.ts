import * as cs from "dev/responses/clusterStatus/tools";

import * as shortcuts from "test/shortcuts";
import {assert, mock} from "test/tools";

const {item} = shortcuts.common;

const {cluster} = marks.dashboard.clusterList;

const firstName = "first";
const firstStatus = cs.cluster(firstName, "ok", {
  resource_list: [cs.primitive("A"), cs.stonith("F1")],
});

const issueList = [
  "No fencing configured in the cluster",
  "Not authorized against node(s) node-3",
  "Unable to connect to the cluster.",
];
const secondName = "second";
const secondStatus = cs.cluster(secondName, "error", {
  node_list: [cs.node("1"), cs.node("2"), cs.node("3")],
  resource_list: [
    cs.primitive("A"),
    cs.primitive("B"),
    cs.stonith("F1"),
    cs.stonith("F2"),
  ],
  warning_list: cs.issues(issueList.slice(0, -1)),
  error_list: cs.issues([issueList[2]]),
});

describe("Dashboard scene", () => {
  beforeEach(() =>
    mock.shortcuts.withDashboard({
      clusterStatus: [firstStatus, secondStatus],
    }),
  );

  afterEach(mock.stop);

  it("should render multiple cluster information", async () => {
    await goToDashboard();

    await assert.countIs(cluster, 2);

    const first = item(cluster).byKey(c => c.name, firstName);
    await assert.textIs(
      first.locator(c => c.loaded.issuesCount),
      "0",
    );
    await assert.textIs(
      first.locator(c => c.loaded.nodeCount),
      "2",
    );
    await assert.textIs(
      first.locator(c => c.loaded.resourceCount),
      "1",
    );
    await assert.textIs(
      first.locator(c => c.loaded.fenceDeviceCount),
      "1",
    );

    const second = item(cluster).byKey(c => c.name, secondName);
    await assert.textIs(
      second.locator(c => c.loaded.issuesCount),
      "3",
    );
    await assert.textIs(
      second.locator(c => c.loaded.nodeCount),
      "3",
    );
    await assert.textIs(
      second.locator(c => c.loaded.resourceCount),
      "2",
    );
    await assert.textIs(
      second.locator(c => c.loaded.fenceDeviceCount),
      "2",
    );
  });

  it("should allow to display cluster issues", async () => {
    await goToDashboard();
    await click(
      item(cluster)
        .byKey(c => c.name, secondName)
        .locator(c => c.loaded.issuesCount),
    );
    const issueContentIs = async (index: number, message: string) => {
      await assert.textIs(
        item(cluster)
          .byKey(c => c.name, secondName)
          .locator(c =>
            item(c.loaded.issue)
              .byIndex(index)
              .locator(issue => issue.message),
          ),
        message,
      );
    };

    // errors are displayed before warnings, so the third issue is first
    await issueContentIs(0, issueList[2]);
    await issueContentIs(1, issueList[0]);
    await issueContentIs(2, issueList[1]);
  });
});
