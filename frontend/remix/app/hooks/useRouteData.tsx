import { useMatches } from "@remix-run/react"
import React from "react";
/**
 * 
 * @param id  Route Id or default to root
 * @param opts use handle as a fallback if not found
 * @returns Route data 
 */
export function useRouteData<Type>(id?: string, opts?: { handleFallback: boolean }) {

    let _id = id ?? "root";
    const matchingRoutes = useMatches();
    const route = React.useMemo(
        () => matchingRoutes.find((route) => route.id === _id),
        [matchingRoutes, _id]
    );
    let data = route?.data;
    if (data === undefined && opts?.handleFallback && route?.handle !== undefined) {
        data = route?.handle
    }
    return data as Type
}