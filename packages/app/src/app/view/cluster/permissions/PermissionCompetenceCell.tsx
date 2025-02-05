import {CheckCircleIcon, TimesCircleIcon} from "@patternfly/react-icons";

import type {Permission} from "./types";

type CompentenceName = Permission["allow"][number];

export const PermissionCompetenceCell = ({
  permission,
  competenceName,
  presentInCompetenceNames,
  "data-test": dataTest,
}: {
  permission: Permission;
  competenceName: CompentenceName;
  presentInCompetenceNames?: CompentenceName[];
  "data-test": string;
}) => {
  const isAllowed =
    permission.allow.includes(competenceName) ||
    permission.allow.some(c => (presentInCompetenceNames || []).includes(c));
  return (
    <td data-label={competenceName}>
      {isAllowed ? (
        <>
          <CheckCircleIcon className="ha-u-status-success" />
          <span data-test={dataTest}>{" Allowed"}</span>
        </>
      ) : (
        <>
          <TimesCircleIcon className="ha-u-status-danger" />
          <span data-test={dataTest}>{" Disallowed"}</span>
        </>
      )}
    </td>
  );
};
