import { FetcherWithComponents, Outlet, useCatch, useFetcher } from "@remix-run/react";
// import type { LoaderFunction, MetaFunction } from "@remix-run/server-runtime";
// import type { LoaderContext } from "@types";
import { ContentForm, ContractButton_ConstructOptions, ContractHeader_ConstructOptions, ContractInput_ConstructOptions } from '@ui/form';
import { useIff } from "@utils/useIff";
import React from "react";
import Display from "~/components/DisplayHeading";
// export const meta: MetaFunction = () => ({
//   title: "Explore",
// });
// export let loader: LoaderFunction = async ({ params, request, context }) => {
//   let loadCtx = context as unknown as LoaderContext;
//   return {
//     header: {
//       title: "browse",
//       subtitle: "Explore the Remix ecosystem",
//     },
//   };
// };
export const handle = {
  action:"/api/createAccount",
  title: {
    header: "Account",
    name: "title",
    edit: false
  } as ContractHeader_ConstructOptions,
  button: (fetcher: FetcherWithComponents<any>) => {
    return {
      name: "create",
      aria_label: "Create Account",
      label: fetcher.type === "actionSubmission" ? "Please Wait..." : "Create Account",
      isSubmitting: fetcher.type === "actionSubmission"
    } as ContractButton_ConstructOptions
  },
  inputs: [
    {
      name: "namespace",
      header: "Federated Domain",
      description: "Your federated namespace.",
      placeholder: "#://MoneyToken"
    },
  ] as ContractInput_ConstructOptions[],
  inputReducer(state: ContractInput_ConstructOptions[], action: { type: "ADD" | "UPDATE_DESCRIPTION" | "UPDATE_PLACEHOLDER"; payload: ContractInput_ConstructOptions }) {
    switch (action.type) {
      case "ADD":
        state.push(action.payload)
        return state
      case "UPDATE_DESCRIPTION":
        return state.map(input => {
          if (input.name === action.payload.name) {
            return { ...input, description: action.payload.description }
          }
          return input
        })
      case "UPDATE_PLACEHOLDER":
        return state.map(input => {
          if (input.name === action.payload.name) {
            return { ...input, placeholder: action.payload.placeholder }
          }
          return input
        })
      default:
        return state;
    }
  }
};

export default function ContractRoute() {
  const fetcher = useFetcher();
  let [inputs, dispatchInputs] = React.useReducer(handle.inputReducer, handle.inputs);

  useIff([fetcher.data?.publicKey, fetcher.data?.secret], () => {
    dispatchInputs({
      type: "ADD", payload: {
        name: "accountID",
        header: "Wallet ID",
        description: "Your public key to your wallet",
        placeholder: fetcher.data?.publicKey,
        edit: false
      }
    })
    dispatchInputs({
      type: "ADD", payload: {
        name: "secret",
        header: "Signing Key",
        description: "Your wallet's secret key",
        placeholder: fetcher.data?.secret,
        edit: false
      }
    })
  })

  return (
    <div>
      <ContentForm
        button={handle.button(fetcher)}
        action={handle.action}
        title={handle.title}
        inputs={inputs} />
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
