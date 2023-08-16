import * as cs from "dev/responses/clusterStatus/tools";

import * as shortcuts from "test/shortcuts";
import {mock} from "test/tools";

const {importedClusters, goToDashboard} = shortcuts.dashboard;
const {countIs} = shortcuts.expect;

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

    await countIs(marks.dashboard.clusterList.cluster, 2);

    const first = importedClusters.inCluster(firstStatus.cluster_name);
    await first.thereIs(cluster => cluster.loaded.issuesCount, "0");
    await first.thereIs(cluster => cluster.loaded.nodeCount, "2");
    await first.thereIs(cluster => cluster.loaded.resourceCount, "1");
    await first.thereIs(cluster => cluster.loaded.fenceDeviceCount, "1");

    const second = importedClusters.inCluster(secondStatus.cluster_name);
    await second.thereIs(cluster => cluster.loaded.issuesCount, "3");
    await second.thereIs(cluster => cluster.loaded.nodeCount, "3");
    await second.thereIs(cluster => cluster.loaded.resourceCount, "2");
    await second.thereIs(cluster => cluster.loaded.fenceDeviceCount, "2");
  });

  it("should allow to display cluster issues", async () => {
    await goToDashboard();
    const theCluster = importedClusters.inCluster(secondName);
    await click(theCluster.get(cluster => cluster.loaded.issuesCount));
    const issueContentIs = async (index: number, message: string) => {
      await shortcuts.expect.textIs(
        theCluster.inIssue(index).get(issue => issue.message),
        message,
      );
    };

    // errors are displayed before warnings, so the third issue is first
    await issueContentIs(0, issueList[2]);
    await issueContentIs(1, issueList[0]);
    await issueContentIs(2, issueList[1]);
  });
});
