import { DataFunctionArgs, json } from "@remix-run/server-runtime";
import { createAccount, buddybot } from '@stellar';
import { Config } from "@utils/config";

export async function loader({request}:DataFunctionArgs) {
  let pair = createAccount();
  var search = new URLSearchParams(request.url)
  try {
    if (Config.NODE_ENV !== 'production' && search.get("friendbot") === "true") {
      await buddybot(pair.publicKey);
    }
  } catch (error) {
    return json(error);
  }
  return json(pair);
};