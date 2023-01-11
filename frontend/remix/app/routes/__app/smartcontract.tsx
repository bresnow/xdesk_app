import {  Outlet, useCatch, useActionData, useLoaderData } from "@remix-run/react";
import { json, LoaderFunction  } from "@remix-run/server-runtime";
import { ContentForm, ContractButton_ConstructOptions, ContractHeader_ConstructOptions, ContractInput_ConstructOptions } from '@ui/form';
import { Suspense } from "react";
import Display from "~/components/DisplayHeading";
import { ActionFunction } from '@remix-run/server-runtime';
import { FormEntry } from '@utils/index';
import {  StellarSdk } from '@stellar';
import { Tabs } from "@ui/index";
import PricingCard2 from '@ui/kit/components/commerce/pricing/PricingCard2';
import PricingCard3 from '@ui/kit/components/commerce/pricing/PricingCard3';
import PaymentCard from '../../../../ui/kit/components/elements/data/PaymentCard';
import DropDownMenu from '../../../../ui/kit/components/elements/ddm/DropDownMenu';
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
  let pair = StellarSdk.Keypair.random()
  return json<Data>({
    action: "/smartcontract/createAccount",
    title: {
      header: namespace,
      name: "_title",
      edit: false
    },
    button: {
      name: "_submit",
      value: "wallet",
      aria_label: "Create Wallet",
      label: "Create Wallet"
    },
    inputs: [
      {
        name: "destination",
        header: "Wallet ID",
        description: "Your public key to your wallet",
        placeholder: pair.publicKey(),
        edit: false
      },
      {
        name: "startingBalance",
        header: "Starting Balance",
        description: "Starting Balance",
        placeholder: "5",
        edit: false,
      }
    ]
  });
}

export default function ContractRoute() {
  var { button, action, title, inputs } = useLoaderData<Data>();
  var _action = useActionData();
  return (
    <div>
      <Tabs list={[{label:"one", to: '/'}]}/>
      <Suspense fallback={<p>Holdup</p>}>
        <ContentForm
          button={(typeof _action !== 'string' && _action?.button) ? _action.button : button}
          method={"post"}
          action={(typeof _action !== 'string' && _action?.action) ? _action.action : action}
          title={(typeof _action !== 'string' && _action?.title) ? _action?.title : title}
          inputs={(typeof _action !== 'string' && _action?.inputs) ? _action.inputs : inputs}
          onSubmit={() => {
            button.isSubmitting=true;
          }}
        />
      </Suspense>
      <div className={"relative flex flex-row items-center"}>
      <PaymentCard/>
      <PricingCard2/>
      <PricingCard3/>
      <DropDownMenu items={[{label:"one"}, {label:"two"}]}/>
      </div>
      <Outlet/>
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
