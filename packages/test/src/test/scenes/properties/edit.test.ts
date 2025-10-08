import {assert, mock} from "test/tools";
import * as t from "dev/responses/clusterStatus/tools";

const {propertiesUpdate: task} = marks.task;

const clusterName = "test-cluster";
const clusterStatus = t.cluster(clusterName);

const editProperties = async () => {
  await goToCluster(clusterStatus.cluster_name, tabs => tabs.properties);
  await click(marks.cluster.propertiesToolbar.edit);
};

const propertyValueElementByKey = (
  mark: typeof task.propertiesForm.property | typeof task.review.property,
  name: string,
) =>
  item.byKey(
    mark,
    p => p.name,
    name,
    p => p.value,
  );

describe("Cluster properties edit", () => {
  afterEach(mock.stop);
  it("should be sucessfully edited", async () => {
    const propertyMap = {
      "batch-limit": "2",
      "cluster-delay": "70",
    };

    const propertyMapReadableNames = {
      "Batch Limit": propertyMap["batch-limit"],
      "Cluster Delay": propertyMap["cluster-delay"],
    };
    mock.shortcuts.withCluster({
      clusterStatus,
      additionalRouteList: [
        mock.route.updateClusterSettings({
          clusterName,
          settingsMap: propertyMap,
          force: false,
          response: {text: "Update Successful"},
        }),
      ],
    });
    await editProperties();

    for (const [name, value] of Object.entries(propertyMapReadableNames)) {
      await fill(
        propertyValueElementByKey(task.propertiesForm.property, name),
        value,
      );
    }

    await click(task.propertiesFooter.next);

    await assert.textIs(
      Object.entries(propertyMapReadableNames).map(([name, value]) => [
        propertyValueElementByKey(task.review.property, name),
        value,
      ]),
    );
    await click(task.reviewFooter.next);
    await isVisible(task.success);
    await click(task.success.close);
    await isAbsent(task);
  });

  it("should allow force", async () => {
    const propertyMap = {
      "batch-limit": "invalid",
    };

    mock.shortcuts.withCluster({
      clusterStatus,
      additionalRouteList: [
        mock.route.updateClusterSettings({
          clusterName,
          settingsMap: propertyMap,
          force: false,
          response: {
            status: [
              400,
              "Error: 'invalid' is not a valid batch-limit value, use number," +
                " use --force to override\n" +
                "Error: Errors have occurred, therefore pcs is unable to continue",
            ],
          },
        }),
      ],
    });
    await editProperties();

    await fill(
      propertyValueElementByKey(task.propertiesForm.property, "Batch Limit"),
      propertyMap["batch-limit"],
    );

    await click(task.propertiesFooter.next);

    await assert.textIs([
      [
        propertyValueElementByKey(task.review.property, "Batch Limit"),
        propertyMap["batch-limit"],
      ],
    ]);
    await click(task.reviewFooter.next);
    await assert.textIs(task.unsuccess.tryAgain, "Proceed anyway");
    await click(task.unsuccess.cancel);
    await isAbsent(task);
  });
});
