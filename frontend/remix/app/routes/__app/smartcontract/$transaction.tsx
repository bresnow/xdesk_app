import { useCatch, useActionData } from "@remix-run/react";
import Display from "~/components/DisplayHeading";
import { ActionArgs, json } from "@remix-run/node"
import { adminPair, OperationType, StellarSdk, stellarServer } from '@stellar';
import { Suspense } from "react";
import {runOperation} from "@utils/stellar"
import { FormEntry } from "@utils/index";


export const parsify = (object: any) => JSON.parse(JSON.stringify(object))
export async function action({ request,  params }: ActionArgs) {
  let issuerKeys = adminPair()
  let operation = params.transaction as OperationType;
  let options = await FormEntry(request)
  let txResponse = runOperation(issuerKeys, operation,options)

  return json(txResponse)
};

export default function NameSpace() {
  var act = useActionData()
  return (
    <div>
      <Suspense>
        <p>{JSON.stringify(act)}</p>
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
