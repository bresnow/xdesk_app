import invariant from '@remix-run/react/dist/invariant.js'
import { Config } from '@utils/config'
import { sdk, server, Network } from './sdk'

function adminPair() {
  invariant(Config.ISSUER_SEED, "Set the ISSUER_SEED environment variable")
  return sdk.Keypair.fromSecret(Config.ISSUER_SEED)
}

export default function (tx: string) {
  let keypair = adminPair()
  console.log('server tx', tx)
  console.log('server keypair', keypair)

  const restored = new sdk.Transaction(tx, Network);

  restored.sign(keypair);
  return server.submitTransaction(restored);
}
