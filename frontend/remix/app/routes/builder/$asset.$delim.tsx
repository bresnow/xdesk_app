import {
  Outlet,
  useCatch,
  useActionData,
  useLoaderData,
  Form,
} from "@remix-run/react";
import { json, LoaderFunction, redirect } from "@remix-run/server-runtime";
import {
  ContentForm as WalletSetupForm,
  ContractButton_ConstructOptions,
  ContractHeader_ConstructOptions,
  ContractInput_ConstructOptions,
} from "@ui/form";
import { Suspense } from "react";
import Display from "~/components/DisplayHeading";
import { ActionFunction } from "@remix-run/server-runtime";
import { FormEntry } from "@utils/index";
import { StellarSdk } from "@stellar";
import { IconPaths, Tabs } from "@ui/index";
import SimpleSkeleton from "@ui/kit/components/elements/skeleton/SimpleSkeleton";
import React from "react";

export type Asset_Issuer_Route = {
  action: string;
  title: ContractHeader_ConstructOptions;
  button: ContractButton_ConstructOptions;
  inputs: ContractInput_ConstructOptions[];
  hidden?: { name: string; value: string; id: string }[];
};
export let loader: LoaderFunction = ({ params }) => {
  let asset = params.asset ?? "BuildYourNamespace";
  let delim = params.delim;
  if (!delim || delim !== ("#" || "$" || "@"))
    return redirect(`/builder/${asset}/${encodeURIComponent("#")}`);
  let pair = StellarSdk.Keypair.random();
  return json<Asset_Issuer_Route>({
    action: `/builder/${asset}/${encodeURIComponent(delim)}/createAccount`,
    title: {
      header: `${delim}://${asset}`,
      name: "_title",
      edit: false,
    },
    button: {
      name: "_create",
      value: "createNameSpace",
      aria_label: "Create Namespace",
      label: "Create Namespace",
    },
    inputs: [
      {
        name: "namespace",
        id: "",
        header: `Building the ${delim}://${asset} Namespace`,
        description: `Enter the name of your federated namespace, or "HashedTag". It must be either 4 or 12 characters in length..`,
        value: `${delim}://${asset}`,
        edit: true,
      },
      {
        name: "_delim",
        value: delim,
        edit: true,
        description: "",
        dangerouslySetInnerHTML: {
          __html: `<p>Pushin pee... out my uree<p>`,
        },
        dropdown: {
          label: "",
          withBackground: true,
          items: [
            {
              id: "",
              edit: true,
              header: "Namespace #://" + asset,
              name: "_namespace",
              value: `#://${asset}`,
              description: "",
            },
            {
              edit: true,
              name: "destination",
              value: `${pair.publicKey()}`,
              description: "",
              id: "",
              header: "Wallet Public Key",
            },
            {
              name: "_secret",
              id: "",
              header: "Wallet Secret Key",
              edit: true,
              value: `${pair.secret()}`,
              description: "Your wallet's secret key is now encrypted ",
            },
            {
              name: "startingBalance",
              value: "5",
              description: "",
              edit: true,
              id: "",
              header: "Current Ballance",
            },
          ],
        },
        id: "",
        header: "_delim" + delim,
      },
    ],
  });
};
// export let action: ActionFunction = async ({ request, params }) => {
//   var { namespace, _delim } = await FormEntry(request);
//   if (namespace.length < 1 && params.asset !== undefined) {
//     namespace = params?.asset
//   }
//   if(!_delim && params.delim !== undefined) {
//     _delim = params.delim
//   }

//   return json<Asset_Issuer_Route>({
//     action: `/${namespace}/${encodeURIComponent(_delim)}/createAccount`,
//     title: {
//       header: namespace,
//       name: "_title",
//       edit: true
//     },
//     button: {
//       name: "_submit",
//       value: "wallet",
//       aria_label: "Create Wallet",
//       label: "Create Wallet"
//     },
// inputs: []
//   });
// }

export default function ContractRoute() {
  var { button, action, title, inputs } =
    useLoaderData<Asset_Issuer_Route>();
  React.useEffect(() => {});

  return (
    <div>
      <Tabs list={[{ label: "one", to: "/" }]} />

      <WalletSetupForm
        button={button}
        method={"post"}
        action={action}
        title={title}
        inputs={inputs}
      />

      <Outlet />
    </div>
  );
}

export function CatchBoundary() {
  let caught = useCatch();
  caught.data;
  switch (caught.status) {
    case 401:
    case 403:
    case 404:
      return (
        <div className="min-h-screen py-4 flex flex-col justify-center items-center">
          <Display
            title={`${caught.status}`}
            titleColor="white"
            span={`${caught.statusText}`}
            spanColor="pink-500"
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
    <div className="min-h-screen py-4 flex flex-col justify-center items-center">
      <Display
        title="Error:"
        titleColor="#cb2326"
        span={error.message}
        spanColor="#fff"
        description={`error`}
      />
    </div>
  );
}
