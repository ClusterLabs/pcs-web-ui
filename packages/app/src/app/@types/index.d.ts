// indicate that the file is a module
// https://stackoverflow.com/a/59499895
// https://stackoverflow.com/a/42257742
export {};

declare global {
  /* eslint-disable-next-line  */
  var pcsUiEnvAdapter: {
    showMasthead: boolean;
    request: (
      _path: string,
      _headers: Record<string, string>,
      _postBody?: string,
    ) => Promise<{status: number; statusText: string; text: string}>;
    location: {
      getSearch: () => string;
      getPath: () => string;
      navigate: (_to: string, _options?: {replace?: boolean}) => void;
      addEventsListener: (_listener: () => void) => void;
      removeEventsListener: (_listener: () => void) => void;
    };
    user: {
      isHaclient: () => Promise<boolean>;
      isSuperuser: () => boolean;
      addChangeListener: (_listener: () => void) => void;
    };
    colorScheme: {
      addChangeListener: (_listener: (style: string) => void) => void;
    };
  };
}
