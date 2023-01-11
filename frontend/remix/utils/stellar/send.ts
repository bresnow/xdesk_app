import { sdk } from './sdk';

import runOperation from './runOperation';

export default function (admin:sdk.Keypair, to:string, amount:number) {
  return runOperation(admin, 'payment', {
    destination: to,
    asset: sdk.Asset.native(),
    amount: String(amount),
  })
}


