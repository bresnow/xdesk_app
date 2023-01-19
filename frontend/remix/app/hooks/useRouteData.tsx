import { useMatches } from "@remix-run/react"
/**
 * 
 * @param id  Route Id or default to root
 * @param opts use handle as a fallback if not found
 * @returns Route data 
 */
export function useRouteData<Type>(id?: string, opts?: { handleFallback: boolean }) {
    let matches = useMatches()
    let _id = id ?? "root";
    // search route loader first if ! then use the route handle
    let match = matches.find((match, i) => {
        if (match.id === _id) {
            return match
        }
    })
    let data = match?.data;
    if (data === undefined && opts?.handleFallback && match?.handle !== undefined) {
        data = match?.handle
    }
    return data as Type
}