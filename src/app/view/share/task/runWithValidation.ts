import { useDispatch } from "app/view/share/useDispatch";

export const useRunWithValidation = ({
  run,
  runIf,
  clusterName,
  task,
}: {
  run: () => void;
  runIf?: boolean;
  clusterName: string | null;
  task: string;
}) => {
  const dispatch = useDispatch();
  return () => {
    if (runIf) {
      dispatch({
        type: "TASK.VALIDATION.HIDE",
        key: { clusterName, task },
      });
      run();
    } else {
      dispatch({
        type: "TASK.VALIDATION.SHOW",
        key: { clusterName, task },
      });
    }
  };
};
