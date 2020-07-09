import * as t from "io-ts";

export const TApiClusterProperties = t.record(
  t.string,
  t.intersection([
    t.type({
      advanced: t.boolean,
      default: t.string,
      longdesc: t.string,
      name: t.string,
      readable_name: t.string,
      shortdesc: t.string,
      source: t.string,
      value: t.union([t.null, t.string]),
    }),
    t.union([
      t.type({
        type: t.literal("enum"),
        enum: t.array(t.string),
      }),
      t.type({
        // type can be: integer, time, string, boolean, percentage
        // but it is not known whether another value can be there
        type: t.string,
      }),
    ]),
  ]),
);

export type ApiClusterProperties = t.TypeOf<typeof TApiClusterProperties>;
