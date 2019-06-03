import { appPlugger } from "app/core/plug-tools";

import sagas from "./sagas";

const { plug } = appPlugger(null, sagas, {});

export default plug;
