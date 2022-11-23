import {endpoints} from "app/backend/endpoints";

import * as responses from "dev/responses";

const {validate} = endpoints.getPermissions;

describe("getPermissions endpoint", () => {
  it("should succeed with proper payload", async () => {
    expect(validate(responses.permissions())).toEqual([]);
  });

  it("should report bad key in dependency", async () => {
    expect(
      validate(
        responses.permissions({
          permissions_dependencies: {
            also_allows: {nonsense: ["read"]},
          },
        }),
      ),
    ).toEqual([
      'Permission dependency key "nonsense"'
        + " is not in types: read, write, grant, full",
    ]);
  });
});
