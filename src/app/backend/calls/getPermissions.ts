import {
  CallResult,
  endpoints,
  http,
  validate as validatePayload,
} from "./tools";

const {url, shape, validate} = endpoints.getPermissions;

export const getPermissions = async ({
  clusterName,
}: {
  clusterName: string;
}): CallResult<typeof shape> =>
  http.get(url({clusterName}), {
    validate: payload => {
      const errors = validatePayload.shape(payload, shape);
      if (errors.length > 0) {
        return errors;
      }

      return validate(payload);
    },
  });
