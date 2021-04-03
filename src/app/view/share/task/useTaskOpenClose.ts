import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { parse, stringifyUrl } from "query-string";
import { push } from "connected-react-router";

export const useTaskOpenClose = (taskKey: string) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = parse(location.search);
  const openUrl = stringifyUrl({
    url: location.pathname,
    query: { ...params, task: taskKey },
  });

  const { task, ...withoutTask } = params;
  const closeUrl = stringifyUrl({
    url: location.pathname,
    query: withoutTask,
  });

  return {
    open: () => dispatch(push(openUrl)),
    close: () => dispatch(push(closeUrl)),
    isOpened: params.task === taskKey,
  };
};
