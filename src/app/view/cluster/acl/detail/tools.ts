import { Acls } from "../types";

export const getAssignedSubjectIdList = (
  subjectMap: Acls["user"] | Acls["group"],
  roleId: string,
) => {
  const result = Object.entries(subjectMap || {})
    .filter(([_id, roleIdList]) => roleIdList.includes(roleId))
    .map(([id, _roleIdList]) => id);
  return result;
};
