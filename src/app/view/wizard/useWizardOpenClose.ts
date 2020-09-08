import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { parse, stringifyUrl } from "query-string";
import { push } from "connected-react-router";

export const useWizardOpenClose = (wizardKey: string) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = parse(location.search);
  const openUrl = stringifyUrl({
    url: location.pathname,
    query: { ...params, wizard: wizardKey },
  });

  const { wizard, ...withoutWizard } = params;
  const closeUrl = stringifyUrl({
    url: location.pathname,
    query: withoutWizard,
  });

  return {
    open: () => dispatch(push(openUrl)),
    close: () => dispatch(push(closeUrl)),
    isOpened: params.wizard === wizardKey,
  };
};
