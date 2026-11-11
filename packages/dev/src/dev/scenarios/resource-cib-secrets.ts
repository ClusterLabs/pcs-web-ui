import {app} from "dev/app";
import * as response from "dev/responses";
import * as shortcut from "dev/shortcuts";

app.libCluster("resource-get-cibsecrets", (req, res) => {
  const queries: [string, string][] = req.body.queries ?? [];
  const resourceId = queries[0]?.[0];

  if (resourceId === "C2") {
    res.json(response.lib.error([response.lib.report.error()]));
    return;
  }

  if (resourceId === "C3") {
    res.json(response.lib.permissionDenied);
    return;
  }

  if (resourceId === "C4") {
    res.json(response.lib.notAuthorized);
    return;
  }

  res.json(
    response.lib.success({
      data: {
        resource_secrets: queries.map(([resource_id, name]) => ({
          resource_id,
          name,
          value: `secret-${resource_id}-${name}-${Math.random().toString(36).slice(2, 8)}`,
        })),
      },
    }),
  );
});

shortcut.clusterStatus(response.clusterStatus.resourceTree);
shortcut.clusterRelated();
