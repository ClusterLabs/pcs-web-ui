import * as http from "http";
import * as https from "https";

// WARNING: Do not use arrow function for listeners, e.g.:
// nodeResponse.on("end", response.end);
// Otherwise you get: TypeError: this._implicitHeader is not a function
// because of wrong context for (internal) `this`

const host = process.env.PCSD_HOST_PROXY || "";
const port = process.env.PCSD_PORT_PROXY || 2224;

const debug = process.env.DEBUG || false;

const log = (...args: unknown[]) => {
  if (debug !== false) {
    console.log(...args);
  }
};

http
  .createServer((request, response) => {
    log(
      `${request.method?.toLowerCase() === "post" ? "POST" : "GET "} ${
        request.url
      }`,
    );

    const options = {
      host,
      port,
      path: request.url,
      method: request.method,
      rejectUnauthorized: false,
      headers: request.headers,
    };

    const nodeRequest = https.request(options, function (nodeResponse) {
      nodeResponse.pipe(response);
      response.writeHead(nodeResponse.statusCode || 500, nodeResponse.headers);
    });

    request.addListener("data", function (chunk) {
      nodeRequest.write(chunk, "binary");
    });
    request.addListener("end", function () {
      nodeRequest.end();
    });
    nodeRequest.on("error", e => console.error(e));
  })
  .listen(process.env.PORT || 5000);
