import type { LoaderArgs } from "@remix-run/node"
import { Config } from "../../../utils/config"
export async function loader(args: LoaderArgs) {
  const toml = `
 [[CURRENCIES]]
code="USD"
issuer="${Config.ISSUER_ID}"
`
  return toml
};