import React from "react";

import { TaskProgress } from "app/view/share";

import { useTask } from "./useTask";
import { Success } from "./Success";
import { Fail } from "./Fail";
import { Error } from "./Error";

export const Finish: React.FC = () => {
  const {
    state: { response, resourceName },
  } = useTask();
  switch (response) {
    case "success":
      return <Success />;
    case "fail":
      return <Fail />;
    case "communication-error":
      return <Error />;
    default:
      return (
        <TaskProgress
          title={`Create new resource "${resourceName}" progress`}
          progressTitle="Creating resource"
        />
      );
  }
};
