import { sdk } from "./sdk"

import runOperation from './runOperation'

export default  function (admin:sdk.Keypair, address:string, startingBalance = '1.5000100') {
  return runOperation(admin, 'createAccount', {
    destination: address,
    startingBalance: String(startingBalance)
  })
}

