import { PassThrough } from "stream";
import { renderToPipeableStream } from "react-dom/server";
import type { EntryContext, Headers } from "@remix-run/node";
import { Response } from "@remix-run/node";
import isbot from "isbot";
import { RemixServer } from "@remix-run/react";

const ABORT_DELAY = 5000;
let helmet = [
  ["Content-Type", "text/html"],
  ["Transfer-Encoding", "chunked"],
  ["Connection", "keep-alive"],
];

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const callbackName = isbot(request.headers.get("user-agent"))
    ? "onAllReady"
    : "onShellReady";

  return new Promise((resolve, reject) => {
    let didError = false;

    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        [callbackName]() {
          let body = new PassThrough();

          helmet.forEach((header) => {
            responseHeaders.set(header[0], header[1]);
          });

          resolve(
            new Response(body, {
              status: didError ? 500 : responseStatusCode,
              headers: responseHeaders,
            })
          );
          pipe(body);
        },
        onShellError(err) {
          reject(err);
        },
        onError(error) {
          didError = true;
          console.error(error);
        },
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
