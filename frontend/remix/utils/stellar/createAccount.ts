import { sdk } from './sdk';

import getBalance from './getBalance';

export default function  (key:string, startingBalance:number) {
  const keypair = key ? sdk.Keypair.fromSecret(key) : sdk.Keypair.random();
  const account = new sdk.Account(keypair.publicKey(), "1")

  const tx = new sdk.TransactionBuilder(account)
  tx.addOperation(sdk.Operation.createAccount({
      destination: keypair.publicKey(),
      startingBalance: String(startingBalance)
    }))
    .build()
    .sign(keypair)

  console.log('secretString', key)
  console.log('publicKey', keypair.publicKey())
  console.log('acc', account)

  const balance = getBalance(keypair.publicKey())

  console.log('balance', balance)

  return keypair
}
