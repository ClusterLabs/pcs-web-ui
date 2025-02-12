// biome-ignore lint/suspicious/noExplicitAny:
export async function waitForResponse(urlPattern: RegExp): Promise<any> {
  return page.evaluate(
    pattern =>
      new Promise(resolve => {
        // If there is iframe we are in cockpit and we need listen to events
        // inside iframe. Else, in standalone mode, we need to listen to global
        // `document`.
        const doc =
          (
            document.querySelector(
              'iframe[name$="/ha-cluster"]',
            ) as HTMLIFrameElement
          )?.contentWindow?.document ?? document;

        const listener = (event: CustomEvent) => {
          if (pattern.test(event.detail.url)) {
            doc.removeEventListener("pcsd-response", listener);
            resolve(event.detail);
          }
        };
        doc.addEventListener("pcsd-response", listener);
      }),
    urlPattern,
  );
}
