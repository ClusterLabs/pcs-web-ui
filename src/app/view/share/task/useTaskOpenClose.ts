import { parse, stringifyUrl } from "query-string";

import { useLocation } from "app/view/share";

export const useTaskOpenClose = (taskKey: string) => {
  const { path, navigate, search } = useLocation();
  const params = parse(search);
  const openUrl = stringifyUrl({
    url: path,
    query: { ...params, task: taskKey },
  });

  const { task, ...withoutTask } = params;
  const closeUrl = stringifyUrl({
    url: path,
    query: withoutTask,
  });

  return {
    open: () => navigate(openUrl),
    close: () => navigate(closeUrl),
    isOpened: params.task === taskKey,
  };
};
