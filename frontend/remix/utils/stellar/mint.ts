import { sdk} from './sdk'

import runOperation from './runOperation'

export default  function(admin:sdk.Keypair, asset:string, to:string, amount:number) {
  return runOperation(admin, 'payment', {
    destination: to,
    asset: asset,
    amount: String(amount),
  })
}

