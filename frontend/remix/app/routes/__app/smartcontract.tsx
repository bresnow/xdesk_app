import { FetcherWithComponents, Outlet, useCatch, useActionData, useLoaderData } from "@remix-run/react";
import { json, LoaderFunction, MetaFunction } from "@remix-run/server-runtime";
import type { LoaderContext } from "@types";
import { ContentForm, ContractButton_ConstructOptions, ContractHeader_ConstructOptions, ContractInput_ConstructOptions } from '@ui/form';
import React, { Suspense } from "react";
import Display from "~/components/DisplayHeading";
import { ActionFunction } from '@remix-run/server-runtime';
import { FormEntry } from '@utils/index';
import axios from 'redaxios';
import { createAccount } from '@stellar';
// export const meta: MetaFunction = () => ({
//   title: "Explore",
// });
export type Data = {
  action: string;
  title: ContractHeader_ConstructOptions;
  button: ContractButton_ConstructOptions;
  inputs: ContractInput_ConstructOptions[];
}
export let loader: LoaderFunction = () => {
  return json<Data>({
    action: "/smartcontract",
    title: {
      header: "Account",
      name: "title",
      edit: false
    },
    button: {
      name: "create",
      value: "createNameSpace",
      aria_label: "Create Namespace",
      label: "Create Namespace",
    },
    inputs: [
      {
        name: "namespace",
        header: "Federated Domain",
        description: "Your federated namespace.",
        placeholder: "#://MoneyToken"
      },
    ]
  });
}
export let action: ActionFunction = async ({ request, context }) => {
  var { namespace } = await FormEntry(request);
  let { publicKey, secret } = createAccount()
  return json<Data>({
    action: "/api/stellar/createAccount",
    title: {
      header: namespace,
      name: "title",
      edit: false
    },
    button: {
      name: "create",
      value: "wallet",
      aria_label: "Create Wallet",
      label: "Create Wallet"
    },
    inputs: [
      {
        name: "accountID",
        header: "Wallet ID",
        description: "Your public key to your wallet",
        placeholder: publicKey,
        edit: false
      },
      {
        name: "secret",
        header: "Signing Key",
        description: "Your wallet's secret key",
        placeholder: secret,
        edit: false
      },
    ]
  });
}

export default function ContractRoute() {
  var { button, action, title, inputs } = useLoaderData<Data>();
  var _action = useActionData();

  return (
    <div>
      <Suspense fallback={<p>Holdup</p>}>
        <ContentForm
          button={_action?.button ? _action.button : button}
          action={_action?.action ? _action.action : action}
          title={_action?.title ? _action?.title : title}
          inputs={_action?.inputs ? _action.inputs : inputs} />
      </Suspense>
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
