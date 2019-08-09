import { appPlugger } from "app/core/plug-tools";

import reducer from "./reducer";
import sagas from "./sagas";

const { plug } = appPlugger(reducer, sagas, {});

export default plug;
