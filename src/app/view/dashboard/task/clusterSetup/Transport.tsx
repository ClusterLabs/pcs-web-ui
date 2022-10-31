import {useTask} from "./useTask";
import {TransportKnet} from "./TransportKnet";

export const Transport = () => {
  const {
    state: {transportType, linkList},
  } = useTask();

  if (transportType === "knet") {
    return <TransportKnet linkList={linkList} />;
  }
  return null;
};
