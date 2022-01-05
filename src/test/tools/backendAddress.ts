import * as appLocationMap from "app/view/share/location";
export const HOST = "http://localhost:3000";

type AppLocations = typeof appLocationMap;

const fixRoutingFormat = (rawLocation: string) => {
  const unprefixedLocation = rawLocation.startsWith("~")
    ? rawLocation.slice(1)
    : rawLocation;

  return unprefixedLocation === "/ui" ? "/ui/" : unprefixedLocation;
};

const fullLocation = (relativeLocation: string) =>
  `${HOST}${fixRoutingFormat(relativeLocation)}`;

const wrapLocationCreator =
  <KW extends Record<string, string>>(
    fn: (_keywords: KW) => string,
  ): ((_keywords: KW) => string) =>
  (keywords: KW) =>
    fullLocation(fn(keywords));

export const location = Object.entries(appLocationMap).reduce<AppLocations>(
  (locations, [key, appLocation]): AppLocations => ({
    ...locations,
    [key]:
      typeof appLocation === "string"
        ? fullLocation(appLocation)
        : wrapLocationCreator(
            appLocation as (_keywords: Record<string, string>) => string,
          ),
  }),
  {} as AppLocations,
);
