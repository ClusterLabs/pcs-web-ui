import { Route } from "playwright";

export const response = (status: number, body: string) => (route: Route) =>
  route.fulfill({ status, body });

export const json = (responseObject: unknown) =>
  response(200, JSON.stringify(responseObject));

export const text = (textData: string) => response(200, textData);

export const unauthorized = response(401, "");
