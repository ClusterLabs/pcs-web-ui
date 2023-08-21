import * as cs from "dev/responses/clusterStatus/tools";

import {assert, mock} from "test/tools";

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

const issueContentIs = async (index: number, message: string) => {
  await assert.textIs(
    item.byName(cluster, secondName, c =>
      item.byIndex(c.issue, index, i => i.message),
    ),
    message,
  );
};

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

    const first = item.byName(cluster, firstName);
    const second = item.byName(cluster, secondName);
    await assert.textIs([
      [first(c => c.issuesCount), "0"],
      [first(c => c.nodeCount), "2"],
      [first(c => c.resourceCount), "1"],
      [first(c => c.fenceDeviceCount), "1"],
      [second(c => c.issuesCount), "3"],
      [second(c => c.nodeCount), "3"],
      [second(c => c.resourceCount), "2"],
      [second(c => c.fenceDeviceCount), "2"],
    ]);
  });

  it("should allow to display cluster issues", async () => {
    await goToDashboard();
    await click(item.byName(cluster, secondName, c => c.issuesCount));

    // errors are displayed before warnings, so the third issue is first
    await issueContentIs(0, issueList[2]);
    await issueContentIs(1, issueList[0]);
    await issueContentIs(2, issueList[1]);
  });
});
