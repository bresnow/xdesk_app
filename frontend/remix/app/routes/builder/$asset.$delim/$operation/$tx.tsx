import { Outlet, useCatch, useActionData, useLoaderData, Form } from "@remix-run/react";
import { json, LoaderFunction, redirect } from "@remix-run/server-runtime";
import { ContentForm, ContractButton_ConstructOptions, ContractHeader_ConstructOptions, ContractInput_ConstructOptions } from '@ui/form';
import { Suspense } from "react";
import Display from "~/components/DisplayHeading";
import { ActionFunction } from '@remix-run/server-runtime';
import { FormEntry } from '@utils/index';
import { StellarSdk } from '@stellar';
import { Tabs } from "@ui/index";
import SimpleSkeleton from '@ui/kit/components/elements/skeleton/SimpleSkeleton';

export type Data = {
  action: string;
  title: ContractHeader_ConstructOptions;
  button: ContractButton_ConstructOptions;
  inputs: ContractInput_ConstructOptions[];

}
export let loader: LoaderFunction = ({ params }) => {

  return redirect("/smartcontract")
}
export let action: ActionFunction = async ({ request }) => {
  var { namespace } = await FormEntry(request);
  let pair = StellarSdk.Keypair.random()
  if (!namespace) {
    throw new Response("No namespace", { status: 401 })
  }
  return json<Data>({
    action: `/smartcontract/createAccount`,
    title: {
      header: namespace,
      name: "_title",
      edit: true
    },
    button: {
      name: "_submit",
      value: "wallet",
      aria_label: "Create Wallet",
      label: "Create Wallet"
    },
    inputs: [
    ]
  });
}

export default function ContractRoute() {
  var { button, action, title, inputs } = useLoaderData<Data>();
  var _action = useActionData<Data>();

  return (
    <div>
      <Tabs list={[{ label: "one", to: '/' }]} />
      <Suspense fallback={<><SimpleSkeleton /><SimpleSkeleton /></>
      }>
        <ContentForm
          button={_action?.button ?? button}
          method={"post"}
          action={_action?.action ?? action}
          title={_action?.title ?? title}
          inputs={_action?.inputs ?? inputs}
        />

      </Suspense>
      <Outlet />
    </div>
  );
}






















export function CatchBoundary() {
  let caught = useCatch();

  switch (caught.status) {
    case 401:
    case 403:
    case 404:
      return (
        <div className='min-h-screen py-4 flex flex-col justify-center items-center'>
          <Display
            title={`${caught.status}`}
            titleColor='white'
            span={`${caught.statusText}`}
            spanColor='pink-500'
            description={`${caught.statusText}`}
          />
        </div>
      );
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <div className='min-h-screen py-4 flex flex-col justify-center items-center'>
      <Display
        title='Error:'
        titleColor='#cb2326'
        span={error.message}
        spanColor='#fff'
        description={`error`}
      />
    </div>
  );
}
