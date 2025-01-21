import type {Root} from "./types";

export const getUsername = (state: Root) => state.username;

export const usernameLoaded = (state: Root) => state.username !== "";
