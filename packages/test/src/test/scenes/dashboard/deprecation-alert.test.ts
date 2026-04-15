import {mock} from "test/tools";

const {deprecationAlert} = marks.dashboard;

describe("Deprecation alert", () => {
  beforeEach(async () => {
    await page.evaluate(() =>
      localStorage.removeItem("deprecationMultiClusterDismissed"),
    );
    mock.shortcuts.withDashboard({clusterStatus: []});
  });

  afterEach(mock.stop);

  it("should display deprecation alert", async () => {
    await goToDashboard();
    await isVisible(deprecationAlert);
  });

  it("should hide alert after clicking close", async () => {
    await goToDashboard();
    await click(deprecationAlert.close);
    await isAbsent(deprecationAlert);
  });

  it("should show 'Show deprecation notices' after dismiss", async () => {
    await goToDashboard();
    await click(deprecationAlert.close);
    await isVisible(deprecationAlert.showNotices);
  });

  it("should restore alert when clicking 'Show deprecation notices'", async () => {
    await goToDashboard();
    await click(deprecationAlert.close);
    await click(deprecationAlert.showNotices);
    await isVisible(deprecationAlert);
  });

  it("should stay hidden when previously dismissed", async () => {
    await page.evaluate(() =>
      localStorage.setItem("deprecationMultiClusterDismissed", "true"),
    );
    await goToDashboard();
    await isAbsent(deprecationAlert);
    await isVisible(deprecationAlert.showNotices);
  });
});
