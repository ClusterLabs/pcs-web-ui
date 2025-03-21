// indicate that the file is a module
// https://stackoverflow.com/a/59499895
// https://stackoverflow.com/a/42257742
export {};

declare global {
  var pcsUiEnvAdapter: {
    showMasthead: boolean;
    topModal: boolean;
    request: (
      _path: string,
      _headers: Record<string, string>,
      _postBody?: string,
    ) => Promise<
      | {
          status: number;
          statusText: string;
          text: string;
        }
      | {
          type: "NON_HTTP_PROBLEM";
          problem: string;
        }
      | {type: "BACKEND_NOT_FOUND"}
    >;
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
      storageKey: string;
      addChangeListener: (_listener: (style: string) => void) => void;
      dispatchChangeEvent: (requestedTheme: "dark" | "light" | "auto") => void;
    };
    jump: (path: string) => void;
  };
}
