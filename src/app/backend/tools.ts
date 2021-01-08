import * as t from "io-ts";

import * as api from "./call";
import * as validate from "./validate";
import * as http from "./http";
import * as lib from "./lib";
import { endpoints } from "./endpoints";

const { get, post } = http;
export { api, endpoints, http, get, post, validate, t, lib };
