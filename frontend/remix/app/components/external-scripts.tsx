import * as React from "react";
import { useMatches } from "@remix-run/react";
import jsesc from "jsesc";
import {useIff} from "./useIff"



// Rule the world
/**
 * Sergio should get a raise. I'll fork his code all night long. Consensually of course
 *https://github.com/sergiodxa/remix-utils/blob/main/src/react/external-scripts.tsx
 */
type ReferrerPolicy =
  | "no-referrer-when-downgrade"
  | "no-referrer"
  | "origin-when-cross-origin"
  | "origin"
  | "same-origin"
  | "strict-origin-when-cross-origin"
  | "strict-origin"
  | "unsafe-url";

type CrossOrigin = "anonymous" | "use-credentials";

type ScriptDescriptor = {
  async?: boolean;
  crossOrigin?: CrossOrigin;
  defer?: boolean;
  integrity?: string;
  noModule?: boolean;
  nonce?: string;
  referrerPolicy?: ReferrerPolicy;
  src: string;
  type?: string;
  markup?: string;
  id: string;
};

export type ExternalScriptsFunction = () => ScriptDescriptor[];
/**
 * The guys at Remix are talented and great. But the scripts that dont fit my use cases or ,like LiveReload, are missinvg that extra Ooomph
 * Here you can add custom scripts and functions to your root route.
 * Optional: safely add sanitized innerHtml if script is a string markup
 * @param opts.manualInjection = In case you want to inject scripts manually instead of from handle
 * @returns Link tags and script tags[]
 */
export function EnhancedScripts(opts?: {
  manualInjection: ScriptDescriptor[];
}) {
  let { manualInjection: manualScripts } = opts || {};
  let matches = useMatches();
  let scripts = matches.flatMap((match) => {
    let scripts = match.handle?.scripts as ExternalScriptsFunction | undefined;
    if (typeof scripts === "function") return scripts();
    return [];
  });

  /**
   * goal here is to also use the handle as a pointer to a script rendering resource route.
   * TODO: build the resource route
   */

  //*  handle optional scripts injected in props
  useIff([manualScripts], () => {
    (manualScripts as ScriptDescriptor[]).forEach((script) => {
      scripts.push(script);
    });
  });

  //* Safely add innerHtml if available

  useIff([scripts.length > 0], () => {
    scripts.forEach(({ id, ...props }) => {
      let target = document.getElementById(id);
      if (props.markup) {
        (target as HTMLScriptElement).innerHTML = jsesc(props.markup); //escaped markup
      }
    });
  });

  return (
    <>
      {scripts.map((props) => {
        let rel = props.noModule ? "modulepreload" : "preload";
        let as = !props.noModule ? "script" : undefined;
        return (
          <link
            key={props.src}
            rel={rel}
            href={props.src}
            as={as}
            crossOrigin={props.crossOrigin}
            integrity={props.integrity}
            referrerPolicy={props.referrerPolicy}
          />
        );
      })}

      {scripts.map(({ markup: html, ...props }) => {
        return <script {...props} key={props.src} />;
      })}
    </>
  );
}
