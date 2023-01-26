// import { ActionArgs, redirect } from "@remix-run/node"
// import type { LoaderArgs } from "@remix-run/node"
// import { Client, Functions, Account } from 'node-appwrite';
// import { Config } from '@utils/config';
// import { FormEntry } from "@utils/index";

// const client = new Client();
// const account = new Account(client);
// const functions = new Functions(client);
// client
//     .setEndpoint(Config.APPWRITE_ENDPOINT)
//     .setProject(Config.APPWRITE_PROJECT_ID);

// export async function loader({request, params}: LoaderArgs) {
//     let params1= params.param
//     return {}
// };

// export async function action({ request }: ActionArgs) {
//     let body = await FormEntry(request) ?? await request.json()
  
//   return redirect(``);
// };