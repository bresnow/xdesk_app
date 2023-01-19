import { useCatch, useActionData } from "@remix-run/react";
import Display from "~/components/DisplayHeading";
import { ActionArgs, json, LoaderArgs } from "@remix-run/node"
import { adminPair, OperationType } from '@stellar';
import { Suspense } from "react";
import { runOperation } from "@utils/stellar"
import { FormEntry } from "@utils/index";
import PricingCard2 from "@ui/kit/components/commerce/pricing/PricingCard2";
import PricingCard3 from "@ui/kit/components/commerce/pricing/PricingCard3";
import PaymentCard from "@ui/kit/components/elements/data/PaymentCard";
import DropDownMenu from "@ui/kit/components/elements/ddm/DropDownMenu";
import React from "react";

export function loader(args:LoaderArgs){
return null
}
export const parsify = (object: any) => JSON.parse(JSON.stringify(object))
export async function action({ request, params }: ActionArgs) {
  let issuerKeys = adminPair();
  let operation = params.operation as OperationType;
  let opts: any = {}, actiondata: any = {};
  let options = await FormEntry(request) ;

  for (const key in options) {
    let value = options[key]
    if (key.startsWith("_")) {
      actiondata[key] = value;
      delete options[key];
    }
  }
  try {
    let txResponse = await runOperation(issuerKeys, operation, options)
    return json({ txResponse, actiondata, options })

  } catch (error) {
    console.error(error)
    return json({ error, actiondata, options })
  }

};

export default function NameSpace() {
  var act = useActionData();
  React.useEffect(()=> {
    fetch(`/api/GUN/store`)
  })
  return (
    <div>
      <Suspense>
        <div className={"dark:bg-slate-900 rounded-md p-3 relative flex flex-row items-justified"}>
          <PaymentCard />
          <PricingCard2 />
          <PricingCard3 />
          <DropDownMenu items={[{ label: "one" }, { label: "two" }]} />
        </div>
        <p>{JSON.stringify(act, null, 2)}</p>
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
