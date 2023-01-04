import { ActionArgs, json } from "@remix-run/node"
export async function action({ request }: ActionArgs) {
  const formData =  await request.json()
  return json(formData)
};