import { ScriptDescriptor } from "~/components/external-scripts";
import { DataFunctionArgs, json } from "@remix-run/server-runtime";
import React from "react";
import { useLoaderData } from "@remix-run/react";

import { Config } from "@utils/config";
export interface NamespaceLoaderOptions {
  amnion: AmnionInterface;
}
export type AmnionInterface = {
  namespace: string;
  websocket: {
    url: string;
  };
  listeners: {
    close: {
      redirect: string;
    };
  };
  peer: {
    url: string;
  };
};
export const loader = async ({ params }: DataFunctionArgs) => {
  let peer = Config.RELAY_DOMAIN?? 'amnion-relay.fltngmmth.com',
    interfaceUrl = Config.INTERFACE_DOMAIN;

  return json<NamespaceLoaderOptions>({
    amnion: {
      namespace: `${params.namespace}`,
      websocket: {
        url: `wss://${interfaceUrl}/socket`,
      },
      listeners: {
        close: {
          redirect: "https://amnion.fltngmmth.com/",
        },
      },
      peer: {
        url: `https://${peer}/gun`,
      },
    },
  });
};
export let handle: { scripts: () => ScriptDescriptor[] } = {
  scripts: () => [
    {
      id: "broadwayd",
      noModule: false,
      src: "/resource/broadway.js",
    },
  ],
};
export default function AmnionInterface() {
  let { amnion } = useLoaderData<NamespaceLoaderOptions>();
  React.useEffect(() => {
    let fakeInput,
      debugDecoding = false;
    window.alert = function (text) {
      console.log("silent alert: " + text);
      return true;
    };
    var url = window.location.toString();
    var {origin} = window.location;
    
    var query_string = url.split("?");
    if (query_string.length > 1) {
      var params = query_string[1].split("&");

      for (var i = 0; i < params.length; i++) {
        var pair = params[i].split("=");
        if (pair[0] == "debug" && pair[1] == "decoding")
          //@ts-ignore
          debugDecoding = true;
      }
    }

    var loc = amnion.websocket.url;

    var ws = new WebSocket(loc, ["broadway"]);
    ws.binaryType = "arraybuffer";
    if (ws.OPEN) {
      console.log("OPEN", ws.OPEN);
    }

    ws.onopen = function () {
      //@ts-ignore
      if (!inputSocket)
        //@ts-ignore
        inputSocket = ws;
    };
    ws.onclose = function () {
      //@ts-ignore
      if (inputSocket !== null)
        window.location.assign(`${amnion.listeners.close.redirect}`);
      //@ts-ignore
      inputSocket = null;
    };
    ws.onmessage = function (event) {
      //@ts-ignore
      handleMessage(event.data);
    };
    ws.onerror = function (e) {
      console.error("WS ERROR", e);
    };


    var iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
    if (iOS) {
      fakeInput = document.createElement("input");
      fakeInput.type = "text";
      fakeInput.style.position = "absolute";
      fakeInput.style.left = "-1000px";
      fakeInput.style.top = "-1000px";
      document.body.appendChild(fakeInput);
    }
  }),
    [];
  return <></>;
}
