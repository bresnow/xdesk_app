import * as StellarSdk from 'stellar-sdk';
import axios from 'redaxios';
import { Config } from './config';
if (Config.NODE_ENV === 'production') {
  StellarSdk.Networks.PUBLIC;
} else {
  StellarSdk.Networks.TESTNET;
}
export const stellarServer = new StellarSdk.Server(Config.HORIZON_URL ?? "https://horizon-testnet.cnxt.dev");

const pair = StellarSdk.Keypair.random();

const createAccount = () => {
  // Creamos nuestro par de llaves
  const secret = pair.secret();
  const publicKey = pair.publicKey();

  return {
    secret,
    publicKey
  };
};

const buddybot = async (publicKey: string) => {
  const {data:responseJSON } = await axios.get(
    `https://friendbot.stellar.org?addr=${publicKey}`
  );
  return responseJSON;
};

export { createAccount , buddybot };

export { StellarSdk };