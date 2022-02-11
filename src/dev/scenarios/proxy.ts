import * as http from "http";
import * as https from "https";

// WARNING: Do not use arrow function for listeners, e.g.:
// nodeResponse.on("end", response.end);
// Otherwise you get: TypeError: this._implicitHeader is not a function
// because of wrong context for (internal) `this`

const host = process.env.PCSD_HOST1 || "";
const port = process.env.PCSD_PORT1 || 2224;

http
  .createServer((request, response) => {
    console.log(request.url, request.method);

    const options = {
      host,
      port,
      path: request.url,
      method: request.method,
      rejectUnauthorized: false,
      requestCert: true,
      agent: false,
      headers: request.headers,
    };

    const onNodeResponse = (nodeResponse: http.IncomingMessage) => {
      nodeResponse.on("data", function (chunk) {
        response.write(chunk, "binary");
      });
      nodeResponse.on("end", function () {
        response.end;
      });
      response.writeHead(nodeResponse.statusCode || 500, nodeResponse.headers);
    };

    const nodeRequest = https.request(options, onNodeResponse);

    request.addListener("data", function (chunk) {
      nodeRequest.write(chunk, "binary");
    });
    request.addListener("end", function () {
      nodeRequest.end();
    });
    nodeRequest.on("error", e => console.error(e));
  })
  .listen(process.env.PORT || 5000);
