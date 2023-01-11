import { sdk } from './sdk';

export default  function (admin:sdk.Keypair, name:string) {

  const issuer = admin.publicKey();
  return new sdk.Asset(name, issuer);
}
