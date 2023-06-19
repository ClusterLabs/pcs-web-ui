import {types} from "app/store";
import * as lib from "app/view/share/lib";

import {TaskFinishError} from "./TaskFinishError";
import {useTaskContext} from "./TaskContext";

export const TaskFinishLibUnsuccess = (props: {
  reports: types.LibReport[];
  back: React.ReactNode;
  proceed?: React.ReactNode;
  cancel: React.ReactNode;
  "data-test"?: string;
}) => {
  const {taskLabel} = useTaskContext();
  const isForceable = lib.reports.allErrorsCanBeForced(props.reports);
  return (
    <TaskFinishError
      title={`Task "${taskLabel}" failed`}
      message={
        <>
          Operation has not completed successfully (see messages below). You can
          return back, change settings and try again. All messages below will
          stay available.
          {isForceable && (
            <>
              {" "}
              Or you can proceed anyway with the current settings since all
              errors can be overridden.
            </>
          )}
        </>
      }
      primaryAction={props.back}
      secondaryActions={
        <>
          {isForceable && props.proceed}
          {props.cancel}
        </>
      }
      data-test={props["data-test"]}
    />
  );
};
