import { types } from "app/store";

export const allErrorsCanBeForced = (reports: types.LibReport[]) =>
  reports.every(
    r => r.severity.level !== "ERROR" || r.severity.force_code !== null,
  );

export const getForceFlags = (reports: types.LibReport[]): string[] =>
  reports.reduce(
    (forceCodes, { severity: { force_code } }) => [
      ...forceCodes,
      ...(force_code !== null ? [force_code] : []),
    ],
    [] as string[],
  );
