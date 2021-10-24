import * as appLocationMap from "app/view/share/location";
export const HOST = "http://localhost:3000";

type AppLocations = typeof appLocationMap;

const wrapLocationCreator =
  <KW extends Record<string, string>>(
    fn: (_keywords: KW) => string,
  ): ((_keywords: KW) => string) =>
  (keywords: KW) =>
    `${HOST}/ui${fn(keywords)}`;

export const location = Object.entries(appLocationMap).reduce<AppLocations>(
  (locations, [key, appLocation]): AppLocations => ({
    ...locations,
    [key]:
      typeof appLocation === "string"
        ? `${HOST}/ui${appLocation}`
        : wrapLocationCreator(
            appLocation as (_keywords: Record<string, string>) => string,
          ),
  }),
  {} as AppLocations,
);
